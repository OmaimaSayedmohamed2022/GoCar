import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import { connectDB } from './dbConnection/mongoose.js';
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', userRouter);


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



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







// mongoose
//   .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB:", err));

// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });
