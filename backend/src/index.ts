import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import './configs/mongoDB';

import UserRouter from './routers/user.router';
import PostRouter from './routers/post.router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/user', UserRouter);
app.use('/post', PostRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});
