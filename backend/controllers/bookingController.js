const mongoose = require("mongoose");
const Booking=require("../model/Bookings");
const Movies = require("../model/Movies");
const User=require("../model/user")
const newBooking=async(req,res,next)=>
{
const{ movie,date,seatNumber,user}=req.body
let ExistingMovie;
let ExistingUser;
try{
ExistingMovie=await Movies.findById(movie)
ExistingUser=await User.findById(user)
}
catch(err)
{
    console.log(err)
}
if(!ExistingMovie)
{
    return res.status(500).json({ message: "movie not found with given Id" })
}
if(!ExistingUser)
{
    return res.status(500).json({ message: "USER not found with given Id" })
}
let booking;
try{
    booking=new Booking({
        movie,
        date:new Date(`${date}`),
        seatNumber,
        user
    })
    const session=await mongoose.startSession();
    session.startTransaction();
    ExistingUser.bookings.push(booking);
    ExistingMovie.bookings.push(booking)
    await ExistingUser.save({session})
    await ExistingMovie.save({session})
    await booking.save({session})
    session.commitTransaction();
}
catch(err)
{
    console.log(err)
}
if(!booking)
{
    return res.status(500).json({ message: "unable to create a bokking" })
}
res.status(200).json({booking})
}
const getBookingById=async(req,res,next)=>{
const id=req.params.id
let booking;
try{
booking=await Booking.findById(id)
}
catch(err)
{
    console.log(err)
}

if(!booking)
{
    return res.status(500).json({ message: "unable to find booking " })
}
res.status(200).json({booking})
}
const deleteBooking=async(req,res,next)=>{
    const id=req.params.id
    let booking;
    try{
    booking=await Booking.findById(id).populate("user movie")
    console.log(booking)
    // const session=await mongoose.startSession()
    // session.startTransaction();
    // await booking.user.bookings.pull(booking)
    // await booking.movie.bookings.pull(booking)
    // await booking.user.save({session})
    // await booking.movie.save({session})
    // session.commitTransaction();
    }
    catch(err)
    {
        console.log(err)
    }
    
    res.status(200).json({booking ,message:"deleted"})
    }
module.exports={newBooking,getBookingById,deleteBooking}