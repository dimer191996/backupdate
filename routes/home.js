const express = require("express");
const Article = require("../model/article");
const router = express.Router();

router.get("/", async (req, res) => {
  // const articles = [
  //   {
  //     title: " test",
  //     createdAt: Date.now,
  //     Descritption: " test description",
  //   },
  // ];

  const article = await Article.find().sort({ createdAt: "desc" });

  res.render("articles/index", { articles: article });
});

module.exports = router;
