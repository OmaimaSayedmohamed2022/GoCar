import express from "express";
import {
  login,
  loginWithOAuth,
  register,
} from "../controllers/userController.js";
import {
  registerValidation,
  loginValidation,
} from "../middelware/validation.js";

const router = express.Router();

// Registration router
router.post("/register", registerValidation, login);

// Login router
router.post("/login", loginValidation, register);

// login with google router
router.post("/login/google", loginWithOAuth);

export default router;
