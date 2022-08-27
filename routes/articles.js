const express = require("express");
const Article = require("../model/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });

    res.render("articles/show", { article: article });
  } catch (error) {
    res.redirect("/");
  }
});

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticle("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
 
  saveArticle("new")
);

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticle(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.tags =  req.body.tags;
    article.author = req.body.author;
    article.description = req.body.description;
    article.category = req.body.category;
    article.markdown = req.body.markdown;
    article.markdown1 = req.body.markdown1;
    article.markdown2 = req.body.markdown2;
    article.markdown3 = req.body.markdown3;
    article.markdown4 = req.body.markdown4;
    article.related1=req.body.related1;
    article.related2=req.body.related2;
    article.image = req.body.image;
    article.image1 = req.body.image1;
    article.image2 = req.body.image2;
    article.video = req.body.video;
    article.video1 = req.body.video1;

    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (error) {
      console.log(error);
      res.render(`articles/${path}`, { article: article });
    }
  };
}

// function saveImage() {}
module.exports = router;
