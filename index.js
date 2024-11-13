import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import { connectDB } from "./dbConnection/mongoose.js";

import session from 'express-session';
import passport from 'passport';
import passportFacebook from './routers/passportFacebookRouter.js';
import passportGoogle from './routers/passportGoogleRouter.js';


// import cors from "cors";


import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDB();


// Configure Express Session
app.use(session({
  secret: process.env.KEY_TOKEN || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and Passport Session Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Serialization
passport.serializeUser((user, done) => done(null, user.id)); // Serialize only the user ID

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


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


app.use("/auth", userRouter);
app.use('/', passportGoogle);
app.use('/auth/facebook', passportFacebook);

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
