import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, require: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    pfImgURL: { type: String, required: true },
    birthDate: { type: String, required: true },
    role: { type: String, required: true },
    posts: { type: Array },
    savedPosts: { type: Array },
    biddingHistory: { type: Array },
    succeedBid: { type: Array },
  },
  { timestamps: true, _id: false }
);

const UserModel = mongoose.model('auction-users', userSchema);
export default UserModel;
