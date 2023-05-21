const mongoose = require("mongoose");

const Post = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    postType: {
      type: String,
      require: true,
    },
    comment: {
      type: [String],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // time: { type: time,},
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const newuser = mongoose.model("post", Post);
module.exports = newuser;
