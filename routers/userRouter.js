import express from "express";
import {
  register,
  login,
  loginWithGoogle,
  signupWithOAuth,
  loginWithOAuth,
} from "../controllers/userController.js";
import {
  registerValidation,
  loginValidation,
} from "../middelware/validation.js";
import { validationResult } from "express-validator";

const router = express.Router();

// Registration router
router.post("/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  register(req, res);
});

// Login router
router.post("/login", loginValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  login(req, res);
});

// login with google router
router.post(
  "/login/google",
  (req, res, next) => {
    console.log("fi ehhhhhhhhh");
    next();
  },
  loginWithOAuth
);

router.post("/sign-up/google", signupWithOAuth);

export default router;
