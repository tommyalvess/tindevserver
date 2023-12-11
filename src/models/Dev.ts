import mongoose from "mongoose";

const DevSchema = mongoose.model('Dev', new mongoose.Schema({
    // _id: {
    //   type: String,
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    bio: String,
    avatar: {
      type: String,
      required: true,
    },
    likes: [{
      type: mongoose.Types.ObjectId,
      ref: 'Dev',
    }],
    dislikes: [{
      type: mongoose.Types.ObjectId,
      ref: 'Dev',
    }],
  }, {
    timestamps: true,
  }));

export default DevSchema;
