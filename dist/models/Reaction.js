import { Schema, Types } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (value) => new Date(value.toISOString()), // Custom getter to format date
    },
}, {
    toJSON: {
        getters: true,
    },
    _id: false,
});
export default reactionSchema;
