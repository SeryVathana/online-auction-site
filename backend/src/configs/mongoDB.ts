import 'dotenv/config';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

const Initialization = async () => {
  if (!MONGO_URI) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

Initialization();
