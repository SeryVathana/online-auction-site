import express from 'express';
import { createUser, deleteUser, getUser, getUsers } from '../controllers/user.controller';

const route = express.Router();

route.get('/', getUsers);

route.get('/:id', getUser);

route.post('/', createUser);

route.delete('/:id', deleteUser);

export default route;
