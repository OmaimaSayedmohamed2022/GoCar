import express from "express";
import {
  login,
  loginWithOAuth,
  register,
  signupWithOAuth,
} from "../controllers/userController.js";
import {
  registerValidation,
  loginValidation,
} from "../middelware/validation.js";

import {validatorHandlerMiddleware} from '../middelware/validatorHandlerMiddleware.js'
import { userAuth } from '../middelware/userMiddleware.js';
import { requestPasswordReset, verifyCode, resetPassword } from '../controllers/forgetPassword.js';

const router = express.Router();

// Registration Route
router.post('/register', registerValidation,validatorHandlerMiddleware, register);

// Login Route
router.post('/login', loginValidation, validatorHandlerMiddleware, login);

// login with google router
router.post("/login/google", loginWithOAuth);

// sign-up with google router
router.post("/sign-up/google", signupWithOAuth);

// request for reset password router
router.post('/forget-password',userAuth, requestPasswordReset);

// verify code router
router.post('/verify-code', verifyCode);

//reset new password router
router.post('/reset-password',userAuth,loginValidation, resetPassword);

export default router;
