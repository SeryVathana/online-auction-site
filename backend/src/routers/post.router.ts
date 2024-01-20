import express from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post.controller';

const route = express.Router();

route.get('/', getPosts);

route.get('/:id', getPost);

route.post('/', createPost);

route.patch('/:id', updatePost);

route.delete('/:id', deletePost);

export default route;
