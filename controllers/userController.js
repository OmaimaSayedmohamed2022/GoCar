const User=require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')


const register = async (req, res) => {
    try{
    const { userName,email,password,confirmPassword,phone,role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({  userName,email,phone,role , password:hashedPassword})
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully' ,newUser})
    }catch(error){
        console.log("new user register error")
        res.status(404).json({message:"new user register error" ,error:error.message})
        }
};


const login= async(req,res)=>{
    try{
   const {email,password} = req.body;
   const user = await User.findOne({email})
   
   await user.save()
   return res.status(201).send({message:'user login successfully'})
    }catch(error){
   
    console.log('error in login',error)
    return res.status(500).send({message:'error in login ',error:error.message})
   }
   }
module.exports={
    register,
    login
}