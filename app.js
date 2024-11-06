import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import { connectDB } from "./dbConnection/mongoose.js";
// import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDB();

// app.use(cors);
app.use(morgan("dev"));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(express.json());
app.use("/user", userRouter);

// Page Not Found
app.all("*", (req, res, next) => {
  return res.status(404).json({ error: `Invalid req on ${req.originalUrl}` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

