const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurifier(new JSDOM().window);

const CommentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "articles" },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    paragraph: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: [String],
      required: true,
    },

    timestamp: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
