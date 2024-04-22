const mongoose = require("mongoose");
// const anchor = require('markdown-it-anchor');
// const { marked } = require("marked");

const actorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    photos: { type: [String] },
    videos: { type: [String] },
    description: {
      type: String,
      trim: true,
    },
    category: {
      required: true,
      type: String,
      trim: true,
    },
    known_for: {
      type: [String],
      trim: true,
    },
    Personal_details: {
      type: [String],
      trim: true,
    },
    credits: {
      //  required:true,
      type: [String],
      trim: true,
    },
    related_news:{
      type:String
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    timestamp: Number,
  },
  {
    timestamps: true,
  }
);

articleSchema.pre("validate", function (next) {
  next();
});
module.exports = mongoose.model("Actors", articleSchema);
