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

export type PostIdParams = {
  id: string;
};
export type UpdateIdParams = {
  id: string;
};

export type BiddingHistoryType = {
  id: string;
  userId: string;
  bidAmount: number;
  bidDate: Date;
};

export type NewPostBody = {
  title: string;
  description: string;
  initialPrice: number;
  bidIncrement: number;
  curPrice: number;
  endDate: Date;
  biddingHistory: BiddingHistoryType[];
  displayImgURL: string;
  othersImgURL: string[];
  sellerId: string;
  status: string;
};

export type UpdatePostBody = {
  title?: string;
  description?: string;
  initialPrice?: number;
  bidIncrement?: number;
  curPrice?: number;
  endDate?: Date;
  biddingHistory?: BiddingHistoryType[];
  displayImgURL?: string;
  othersImgURL?: string[];
  sellerId?: string;
  status?: string;
};
