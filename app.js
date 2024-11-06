import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import { connectDB } from "./dbConnection/mongoose.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDB();

app.use(cors);
app.use(morgan("dev"));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(express.json());
app.use("/auth", userRouter);

/* Start server */
const serverListen = app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

/* Handling rejection outside express */
process.on("unhandledRejection", (error) => {
  throw error;
});

/* Handling exception */
const uncaughtException = (error) => {
  serverListen.close(() => {
    console.error(
      `The server was shut down due to uncaught exception: ${error.message}`
    );
    process.exit(1);
  });
};

process.on("uncaughtException", uncaughtException);

/* Handle process termination signals */
const shutdown = () => {
  serverListen.close(() => {
    console.log("The server is shutting down...");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
