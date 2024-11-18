import { Schema, model } from 'mongoose';
// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
}, {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
        virtuals: true,
    },
    _id: false,
});
// Create a virtual property `friendCount` that gets the length of friends document array
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
    return this.friends.length;
});
// Initialize our User model
const User = model('users', userSchema);
export { User };
