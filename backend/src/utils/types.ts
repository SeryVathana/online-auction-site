import { ObjectId } from 'mongoose';

export type UserIdParams = {
  id: string;
};

export type UserPostBody = {
  id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  pfImgURL: string;
  birthDate: string;
  role: string;
};
