const mongoose=require("mongoose")
const adminSchemas=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    addMovies:[{
        type:mongoose.Types.ObjectId,
        ref:"Movies"
    }]

},{timestamps:true})
module.exports= mongoose.model("admin",adminSchemas)