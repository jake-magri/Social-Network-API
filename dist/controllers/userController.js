import { User, Friend } from '../models/index.js';
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find().populate('friends');
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate('videos')
            .populate('friends') // Add populate('friends')
            .select('-__v');
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new user
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// TODO: Update a user by id
// Update user by id works
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.userId }, req.body, { new: true });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// TODO: Delete a user by id
// delete user by id works
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.userId });
        res.status(200).json('Deleted successfully!');
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// TODO: create friend on user
export const createFriend = async (req, res) => {
    try {
        const friend = await Friend.create(req.body);
        const user = await User.findByIdAndUpdate(req.params.userId, { $push: { friends: friend } }, { new: true });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// // TODO: delete friend on user
// export const deleteFriend = async (req:Request, res: Response) => {
//   try {
//     const user = await User.findByIdAndUpdate({ _id: req.params.userId }, req.body, {new: true});
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }
