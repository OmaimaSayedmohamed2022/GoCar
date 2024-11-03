const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middelware/GenerateAndVerifyToken");

router.post("/register", userController.register);
router.post("/login", authMiddleware, userController.login);

router.post("/login/google",userController.loginWithGoogle );

module.exports = { userRouter: router };
