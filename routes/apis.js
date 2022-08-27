const express = require("express");
const Article = require("../model/article");
const app = express.Router();
const fields = {
  title: 1,
  author: 1,
  category: 1,
  slug: 1,
  video: 1,
  description: 1,
  related1:1,
  related2:1,
  shares: 1,
  createdAt: 1,
  image: 1,
  views: 1,
  tags: 1,
};
app.get("/", async (req, res) => {
  const articles = await Article.find({}, fields).sort({ createdAt: -1 });
  return res.status(201).send({ articles });
});

app.get("/hot/articles", async (req, res) => {
  const nPerPage = 15;
  const pageNumber = req.query.page || 1;

  const skip = (pageNumber - 1) * nPerPage;
  const countPromise = Article.estimatedDocumentCount({});
  const articlesPromise = Article.find({ category: { $ne: "howto" } }, fields)
    .sort({ createdAt: -1 })
    .limit(nPerPage)
    .skip(skip);
  const [count, articles] = await Promise.all([countPromise, articlesPromise]);

  const pageCount = count / nPerPage;

  return res.status(201).send({
    pagination: {
      count,
      pageCount,
    },
    articles,
  });
});

app.get("/hot/:category/articles", async (req, res) => {
  const nPerPage = 15;
  const pageNumber = req.query.page || 1;

  const skip = (pageNumber - 1) * nPerPage;
  const countPromise = Article.find({
    category: req.params.category.toString(),
  }).count();
  const articlesPromise = Article.find(
    { category: req.params.category.toString() },
    fields
  )
    .sort({ createdAt: -1 })
    .limit(nPerPage)
    .skip(skip);

  const [count, articles] = await Promise.all([countPromise, articlesPromise]);

  const pageCount = count / nPerPage;

  return res.status(201).send({
    pagination: {
      count,
      pageCount,
    },
    articles,
  });
});

app.get("/hot/tag/:tag/articles", async (req, res) => {
  const nPerPage = 15;
  const pageNumber = req.query.page || 1;

  const skip = (pageNumber - 1) * nPerPage;

  const countPromise = Article.find(
    { tags: { $regex: ".*" + req.params.tag + ".*" } },
    {
      title: 1,
      category: 1,
      slug: 1,
      description: 1,
      image: 1,
      tags: 1,
      author: 1,
    }
  ).count();

  const articlesPromise = Article.find(
    { tags: { $regex: ".*" + req.params.tag + ".*" } },
    {
      title: 1,
      category: 1,
      slug: 1,
      description: 1,
      image: 1,
      tags: 1,
      author: 1,
    }
  )
    .sort({ createdAt: -1 })
    .limit(nPerPage)
    .skip(skip);

  const [count, articles] = await Promise.all([countPromise, articlesPromise]);

  const pageCount = count / nPerPage;

  return res.status(201).send({
    pagination: {
      count,
      pageCount,
    },
    articles,
  });
});

app.get("/articles/home/tv", async (req, res) => {
  const articles = await Article.find(
    { category: { $nin: ["short", "truecrime", "marketing", "movie-review"] } },
    fields
  )
    .sort({ createdAt: -1 })
    .limit(20);
  return res.status(201).send({ articles });
});

app.get("/articles/home/stories", async (req, res) => {
  const articles = await Article.find(
    {
      category: {
        $nin: [
          "tv",
          "happyEverAfter",
          "spoilers",
          "truecrime",
          "movie-review",
          "the-ultimatum-marry-or-move-on",
        ],
      },
    },
    fields
  )
    .sort({ createdAt: -1 })
    .limit(10);

  return res.status(201).send({ articles });
});

app.get("/articles/home/movies-entertainment", async (req, res) => {
  const articles = await Article.find(
    {
      category: {
        $nin: ["tv"],
      },
    },
    fields
  )
    .sort({ createdAt: -1 })
    .limit(30);

  return res.status(201).send({ articles });
});

app.put("/article/share/:slug", async (req, res) => {
  await Article.updateOne({ slug: req.params.slug }, { $inc: { shares: 1 } });
  const article = await Article.findOne({ slug: req.params.slug });
  console.log("Shared:" + article.shares);
  return;
});

app.get("/article/:slug", async (req, res) => {
  await Article.updateOne({ slug: req.params.slug }, { $inc: { views: 1 } });
  const article = await Article.findOne({ slug: req.params.slug });
  if (article) {
    return res.status(201).send({ article });
  } else {
    return res.status(404).send({ article: false });
  }
});

app.get("/articles/tv", async (req, res) => {
  const articles = await Article.find(
    { category: { $nin: ["short", "truecrime", "marketing", "movie-review"] } },
    fields
  )
    .sort({ createdAt: -1 })
    .limit(50);
  return res.status(201).send({ articles });
});

app.get("/articles/:category/popular", async (req, res) => {
  const params = req.params.category;
  const articles = await Article.find({ category: params }, fields)
    .sort({ views: -1 })
    .limit(4);
  return res.status(201).send({ articles });
});

app.get("/articles/category/:category", async (req, res) => {
  console.log(req.params.category);
  const articles = await Article.find(
    {
      category: req.params.category.toString(),
    },
    fields
  )
    .sort({
      createdAt: -1,
    })
    .limit(20);
  return res.status(201).send({ articles });
});

app.get("/article/related/:slug", async (req, res) => {
  console.log(req.params.category);
  const articles = await Article.findOne(
    {
      slug: req.params.slug.toString(),
    },
    fields
    )
  
  return res.status(201).send({ articles });
});

module.exports = app;
