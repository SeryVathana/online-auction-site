import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    initialPrice: { type: Number, required: true },
    bidIncrement: { type: Number, required: true },
    curPrice: { type: Number },
    endDate: { type: Date, required: true },
    biddingHistory: { type: Array },
    displayImgURL: { type: String, required: true },
    othersImgURL: { type: Array, required: true },
    sellerId: { type: String, required: true },
    status: { type: String },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('auction-posts', postSchema);
export default PostModel;
