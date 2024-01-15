const express=require("express");
const { signUp, getAllUsers, login, verifyToken, getUser, refreshToken, logout, getBookingsUser} = require("../controllers/userController");
const router=express.Router();
router.get("/getAll",getAllUsers)
router.post("/login",login)
router.post("/signUp",signUp)
router.get("/verify",verifyToken,getUser)
router.get("/refresh",refreshToken,verifyToken,getUser)
router.post("/logout",verifyToken,logout)
router.get("/bookings/:id",getBookingsUser)
module.exports=router
