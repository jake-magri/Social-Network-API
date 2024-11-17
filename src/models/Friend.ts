import { Schema, model } from 'mongoose';
// TODO: update video properties to that of a thought
interface IFriend extends Document {
    first: string;
    last?: string;
    fullName: string;
}
  
const friendSchema = new Schema<IFriend>(
    {
      first: String,
      last: String
    },
    {
      // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

// Create a virtual property `responses` that gets the amount of response per video
// Create a virtual property `fullName` that gets and sets the user's full name
friendSchema
  .virtual('fullName')
  // Getter
  .get(function (this: any) {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (this: any, v: any) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our Video model
const Friend = model('friend', friendSchema);

export default Friend;
