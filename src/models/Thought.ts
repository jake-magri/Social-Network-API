import { Schema, model, Document, Types } from 'mongoose';
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
const Thought = model('thought', thoughtSchema);

export default Thought;
