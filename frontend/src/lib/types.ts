export interface SliderProps {
  url: string;
}

export type sliderArray = ImgType;

export type SellerType = {
  id: string;
  name: string;
  email: string;
  pfImgURL: string;
};

export type ImgType = {
  downloadURL: string;
  name: string;
  storageFileName: string;
  type: string;
};

export type BidHistoryType = {
  bidderId: string;
  bidder: string;
  price: number;
  date: string;
};

export type LocationType = {
  country: string;
  district: string;
  city: string;
};

export type ItemDataType = {
  _id: string;
  title: string;
  description: string;
  initialPrice: number;
  bidIncrement: number;
  category: string;
  status: string;
  displayImgURL: ImgType;
  othersImgURL: string[];
  sellerId: string;
  endDate: Date;
  createdAt: Date;
  biddingHistory: BidHistoryType[];
  currentPrice: number;
};

export type UserDBType = {
  firstName: string;
  lastName: string;
  email: string;
  pfImgURL: string;
  role: string;
  _id: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthContextType = {
  user: UserDBType | null;
  logout: () => void;
};

export type BiddingHistoryType = {
  userId: string;
  userName: string;
  bidAmount: number;
  bidDate: Date;
};

export type PostType = {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
};
