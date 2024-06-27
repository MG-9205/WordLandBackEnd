require("dotenv").config();

const express = require("express");
const Book_route = require("./Routes/BooksRoute");
const User_route = require("./Routes/UserRoute");
const FeedBack_route=require("./Routes/FeedBackRoute")
const apiKeyAuth = require("./apiAuth");

const app = express();

const PORT = process.env.PORT || 3000;

const connect_to_mongo = require("./DB");
connect_to_mongo();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key, X-Auth"
  );
  res.header("Access-Control-Expose-Headers", "X-Auth"); // Expose the X-Auth header
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(apiKeyAuth);

app.get("/home", async (req, res) => {
  res.send("hello World");
});
//middleWare
app.use("/api/Books", Book_route);

app.use("/user", User_route);

app.use("/FeedBack",FeedBack_route)

app.listen(PORT);
