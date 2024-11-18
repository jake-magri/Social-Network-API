import { Schema, model } from 'mongoose';
import Reaction from './Reaction.js';
// Schema to create Post model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (value) => new Date(value.toISOString()), // Custom getter to format date
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    reactions: [Reaction],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Create a virtual property `reactions` that gets the amount of response per thought
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
    return this.reactions.length;
});
// Initialize our thought model
const Thought = model('thoughts', thoughtSchema);
export default Thought;
