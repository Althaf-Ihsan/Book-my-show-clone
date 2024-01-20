const express=require("express");
const { addAdmin, adminLogin, verifyAdminToken, getAdmin, refreshAdminToken, Adminlogout } = require("../controllers/adminController");
const asyncWrapper = require("../middlewares/async");
const router=express.Router();
router.post("/signup",addAdmin)
router.post("/login",adminLogin)
router.get("/verify",verifyAdminToken,getAdmin)
router.get("/refresh",refreshAdminToken,verifyAdminToken,getAdmin)
router.post("/logout",verifyAdminToken,Adminlogout)
module.exports=router