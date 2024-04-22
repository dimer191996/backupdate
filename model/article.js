const mongoose = require("mongoose");
// const anchor = require('markdown-it-anchor');
// const { marked } = require("marked");
const slugify = require("slugify");
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurifier(new JSDOM().window);
const markdownIt = require('markdown-it')();
const anchor = require('markdown-it-anchor');

// Function to add ids to headings in markdown
const addIdsToHeadings = (markdown) => {
    markdownIt.use(anchor, {
         level: [2,3,4],
        permalink: false,
        slugify: string => string.toLowerCase()
        // permalinkSymbol: '#'
        });
    return markdownIt.render(markdown);
}


const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
    },
    video: {
      type: String,
    },
    video1: {
      type: String,
    },
    description: {
      required: false,
      type: String,
      trim: true,
    },
    category: {
      required: true,
      type: String,
      trim: true,
    },
    tags: {
      required: true,
      type: String,
      trim: true,
    },
    related1:{
     // required:true,
      type:String,
      trim:true,
    },
    related2:{
    //  required:true,
      type:String,
      trim:true,
    },
    markdown: {
      type: String,
      required: true,
      trim: true,
    },
    markdown1: {
      type: String,
      required: true,
      trim: true,
    },
    markdown2: {
      type: String,
      required: true,
      trim: true,
    },
    markdown3: {
      type: String,
      required: true,
      trim: true,
    },
    markdown4: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    sanitizedHTML: {
      type: String,
      require: true,
    },
    sanitizedHTML1: {
      type: String,
      require: true,
    },
    sanitizedHTML2: {
      type: String,
      require: true,
    },
    sanitizedHTML3: {
      type: String,
      require: true,
    },
    sanitizedHTML4: {
      type: String,
      require: true,
    },
    articlePreviewMarkdown: {
      type: String,
      required: true,
    },
    articlePreviewTitle: {
      type: String,
      required: true,
    },
    views: {
      default: 0,
      type: Number,
    },
    shares: {
      default: 0,
      type: Number,
    },
    image: {
      type: String,
    },
    image1: {
      type: String,
    },
    image2: {
      type: String,
    },
    timestamp: Number,
  },
  {
    timestamps: true,
  }
);

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.markdown) {
      this.sanitizedHTML = dompurify.sanitize(addIdsToHeadings(this.markdown));
  }
  if (this.markdown1) {
    this.sanitizedHTML1 = dompurify.sanitize(addIdsToHeadings(this.markdown1));
  }
  if (this.markdown2) {
    this.sanitizedHTML2 = dompurify.sanitize(addIdsToHeadings(this.markdown2));
  }
  if (this.markdown3) {
    this.sanitizedHTML3 = dompurify.sanitize(addIdsToHeadings(this.markdown3));
  }
  if (this.markdown4) {
    this.sanitizedHTML4 = dompurify.sanitize(addIdsToHeadings(this.markdown4));
  }
  if (this.sanitizedHTML) {
    this.articlePreviewMarkdown = fn(100, this.sanitizedHTML);
  }
  if (this.title) {
    this.articlePreviewTitle = fn(60, this.title);
  }

  function fn(count, text) {
    return text.slice(0, count) + (text.length > count ? "..." : "");
  }
  next();
});
module.exports = mongoose.model("Article", articleSchema);
