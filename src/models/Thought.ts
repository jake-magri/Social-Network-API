import { Schema, model, Document } from 'mongoose';
import Reaction from './Reaction.js';

// TODO: update video properties to that of a thought
interface IThought extends Document{
  thoughtText: String;
  createdAt: Date;
  username: Schema.Types.ObjectId;
  reactions: typeof Reaction[]; // Reactions is an array of Reaction subdocuments
}

// Schema to create Post model
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value: Date) => new Date(value.toISOString()), // Custom getter to format date
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

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
