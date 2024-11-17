import {User} from '../models/User.js';
import { Request, Response } from 'express';

  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
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
  export const updateUser = async (req:Request, res: Response) => {
    try {
      
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // TODO: Delete a user by id
  export const deleteUser = async (req:Request, res: Response) => {
    try {

    } catch (err) {
      res.status(500).json(err);
    }
  }

  // TODO: create friend on user
  export const createFriend = async (req:Request, res: Response) => {
    try {

    } catch (err) {
      res.status(500).json(err);
    }
  }
  // TODO: delete friend on user
  export const deleteFriend = async (req:Request, res: Response) => {
    try {

    } catch (err) {
      res.status(500).json(err);
    }
  }
