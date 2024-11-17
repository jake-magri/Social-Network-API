import {User, Friend} from '../models/index.js';
import { Request, Response } from 'express';

  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find().populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate('friends')  // Add populate('friends')
      .populate('videos') 
      .select('-__v');

      if (!user) {
         res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // TODO: Update a user by id
  // Update user by id works
  export const updateUser = async (req:Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate({ _id: req.params.userId }, req.body, {new: true});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // TODO: Delete a user by id
  // delete user by id works
  export const deleteUser = async (req:Request, res: Response) => {
    try {
      await User.findByIdAndDelete({ _id: req.params.userId })
      res.status(200).json('Deleted successfully!')
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // TODO: create friend on user
  // create friend works
  export const createFriend = async (req:Request, res: Response) => {
    try {
      const friend = await Friend.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { friends: friend } }, {new: true});

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // TODO: delete friend
  // delete friend function now works
  export const deleteFriend = async (req:Request, res: Response) => {
    try {
      const friend = await Friend.findByIdAndDelete(req.params.userId);

      if (!friend) {
        return res.status(404).json({ message: 'No friend with that ID' });
      }
  
      // Remove the friend reference from the user
      await User.updateMany(
        { friends: friend._id },
        { $pull: { friends: friend._id } }
      );
  
      return res.status(200).json({ message: 'Friend deleted and reference removed' });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
