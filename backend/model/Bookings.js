const mongoose=require("mongoose")
const bookingSchemas=new mongoose.Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"Movies",
        required:true
    },date:{
        type:Date,
        required:true
    },
    seatNumber:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user", 
        required:true
    }
})
module.exports=mongoose.model("booking",bookingSchemas)
