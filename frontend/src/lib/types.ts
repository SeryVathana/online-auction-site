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
  itemName: string;
  itemDescription: string;
  initialPrice: number;
  bidIncrement: number;
  location: LocationType;
  category: string;
  pending: boolean;
  displayImg: ImgType;
  othersImg: ImgType[];
  seller: SellerType;
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
