const mongoose=require("mongoose")
const userSchemas=new mongoose.Schema({
    phone:{
      type:String,
    },
   FirstName:{
        type:String,
    },
    LastName:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        minLength:6,
        required:true
    },
    address:{
        type:String,
    },
    profilePicture:{
        type:String,
    },
    bookings:[{
        type:mongoose.Types.ObjectId,
        ref:"Bookings"
    }]

},{timestamps:true})
module.exports= mongoose.model("user",userSchemas)