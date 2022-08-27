const express = require("express");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config();
const cors = require("cors");

mongoose
  .connect(
    `mongodb+srv://db191996:mitsubishi@cluster0.nwcuh.mongodb.net/blog?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.log("fail to connect to mongo db", err);
  });

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://www.hotseatmag.com"],
  })
);

const homeRouter = require("./routes/home");
const articleRouter = require("./routes/articles");
const apis = require("./routes/apis");

app.use(
  express.urlencoded({
    extended: true,
  })
);
// cloudinary configuration
const cloud = cloudinary.v2;

cloud.config({
  cloud_name: "dggjlyw5e",
  api_key: "286776576534227",
  api_secret: "HSxNQk9A9-wJvPZMHCwGDgB03Zk",
});

app.set("view engine", "ejs");

app.use(methodOverride("_method"));

app.use("/articles", articleRouter);
app.use("/", homeRouter);
app.use("/api", apis);

app.listen(process.env.PORT || 3020, () => {
  console.log("your're connected");
});
