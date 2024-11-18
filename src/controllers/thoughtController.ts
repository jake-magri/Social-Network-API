import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';


export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
  }

  return;
}

// create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const thought = await Thought.create({ username: user._id, thoughtText: req.body.thoughtText });

    await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    res.json('Created the thought 🎉');
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  return;
}

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
}

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Thought created but no user with this id!' });
    }

    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }

  return;
}

// Add a thought response
export const addThoughtReaction = async (req: Request, res: Response) => {
  try {
    console.log("x");
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    console.log(thought);

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// Remove thought response
export const removeThoughtReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { 'reactions.reactionId': req.params.reactionId }, // Match the reactionId within reactions array
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}
