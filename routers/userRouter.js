const express=require('express')
const router =express.Router();
const userController= require('../controllers/userController')
const authMiddleware = require('../middelware/verifyToken')

router.post('/register',userController.register)
router.post('/login',authMiddleware,userController.login)

module.exports=router