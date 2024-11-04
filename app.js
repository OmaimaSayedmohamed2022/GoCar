const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
require("dotenv").config();

const {userRouter} = require("./routers/userRouter.js");
port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;

app.use(cors);
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use("/auth", userRouter);

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
