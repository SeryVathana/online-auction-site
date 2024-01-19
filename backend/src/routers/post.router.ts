import express from 'express';
import { createPost, deletePost, getPost, getPosts } from '../controllers/post.controller';

const route = express.Router();

route.get('/', getPosts);

route.get('/:id', getPost);

route.post('/', createPost);

route.delete('/:id', deletePost);

export default route;
