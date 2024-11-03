const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
userName:{
type:String,
required:true,
tirm:true
},
email:{
    type:String,
    required:true,
    tirm:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
phone:{
    type:Number,
    required:true,
    tirm:true
},
role:{
    type:String,

}

})

module.exports=mongoose.model('User',userSchema)