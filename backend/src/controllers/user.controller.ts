import { RequestHandler } from 'express';
import UserModel from '../models/user.model';
import { UserIdParams, UserPostBody } from '../utils/types';
import { ObjectId } from 'mongoose';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await UserModel.find().exec();

    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }

    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUser: RequestHandler<UserIdParams, unknown, unknown, unknown> = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  try {
    const user = await UserModel.findById(id).exec();

    if (!user) {
      return res.status(404).json({ message: 'No users found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createUser: RequestHandler<unknown, unknown, UserPostBody, unknown> = async (req, res) => {
  try {
    const { id, firstName, lastName, email, pfImgURL, birthDate } = req.body;

    const newUserObject = {
      _id: id,
      firstName,
      lastName,
      email,
      pfImgURL,
      birthDate,
      role: 'user',
    };

    const newUser = await UserModel.create(newUserObject);

    return res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteUser: RequestHandler<UserIdParams, unknown, unknown, unknown> = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  try {
    const user = await UserModel.findByIdAndDelete(id).exec();

    if (!user) {
      return res.status(404).json({ message: 'No users found' });
    }

    return res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
