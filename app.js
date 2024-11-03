const express=require('express')
const app=express()
const mongoose= require('mongoose')
require('dotenv').config()


const userRouter =require('./routers/userRouter.js')
port=process.env.PORT||3000
const mongoUrl = process.env.dbUrl;

app.use(express.json())
app.use('/user',userRouter)

mongoose.connect(mongoUrl, { useNewUrlParser: true,  useUnifiedTopology: true,})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
