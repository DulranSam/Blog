const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      min: 5,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,

      unique: true,
      min: 5,
    },
    image: {
      type: String,
      unique: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
