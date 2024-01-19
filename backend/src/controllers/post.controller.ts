import { RequestHandler } from 'express';
import PostModel from '../models/post.model';
import { NewPostBody, PostIdParams } from '../utils/types';

export const getPosts: RequestHandler = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();

    if (!posts) {
      return res.status(404).json({ message: 'No posts found' });
    }

    return res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getPost: RequestHandler<PostIdParams, unknown, unknown, unknown> = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  try {
    const post = await PostModel.findById(id).exec();

    if (!post) {
      return res.status(404).json({ message: 'No post found' });
    }

    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPost: RequestHandler<unknown, unknown, NewPostBody, unknown> = async (req, res) => {
  try {
    const { title, description, initialPrice, bidIncrement, endDate, displayImgURL, othersImgURL, sellerId } = req.body;

    const newPostObject = {
      title,
      description,
      initialPrice,
      bidIncrement,
      endDate,
      displayImgURL,
      othersImgURL,
      sellerId,
      status: 'pending',
      curPrice: initialPrice,
    };

    const newPost = await PostModel.create(newPostObject);

    return res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deletePost: RequestHandler<PostIdParams, unknown, unknown, unknown> = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  try {
    const user = await PostModel.findByIdAndDelete(id).exec();

    if (!user) {
      return res.status(404).json({ message: 'No post found' });
    }

    return res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
