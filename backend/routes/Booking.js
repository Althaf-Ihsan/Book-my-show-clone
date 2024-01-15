const express=require("express");
const { newBooking, getBookingById, deleteBooking } = require("../controllers/bookingController");
const router=express.Router();
router.post("/",newBooking)
router.get("/:id",getBookingById)
router.delete("/:id",deleteBooking)
module.exports=router