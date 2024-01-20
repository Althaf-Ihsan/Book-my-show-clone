const Admin=require("../model/Admin")
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../middlewares/custom-error");
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const addAdmin=asyncWrapper(async(req,res,next)=>{
    const {email,password}=req.body
    let existingAdmin;
    existingAdmin=await Admin.findOne({email:email})
    if(existingAdmin)
    {
        return next(createCustomError(`Admin already exist`,400))
    }
    let admin;
    const hashedPassword=bcrypt.hashSync(password)
    admin=new Admin({email,password:hashedPassword})
    await admin.save();
    if(!admin)
    {
        return next(createCustomError(`unable to store admin`,500))  
    }
    res.status(201).json({admin,success:true})
    
})
const adminLogin=asyncWrapper(async(req,res,next)=>{
    let existingAdmin;
    const { email, password } = req.body
    console.log(req.body)
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return next(createCustomError("Invalid Input", 422))
    }
    existingAdmin = await Admin.findOne({ email: email })
    if (!existingAdmin) {
        return next(createCustomError(`${email} is not registered`, 400))
    }
    const comparePassword = bcrypt.compareSync(password, existingAdmin.password)
    if (!comparePassword) {
        return next(createCustomError("Incorrect password", 400))
    }
    const Admintoken=jwt.sign({id:existingAdmin._id},process.env.JWT_SECRET,{
        expiresIn: "35s",
    })
    if (req.cookies[`${existingAdmin._id}`]) {
        req.cookies[`${existingAdmin._id}`] = "";
    }
    res.cookie(String(existingAdmin._id), Admintoken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax"
    })
    res.status(200).json({ msg: "login successfull", success: true, Admintoken })

})
const verifyAdminToken = asyncWrapper(async (req, res, next) => {
    const cookie = req.headers.cookie
    const token = cookie.split("=")[1]
    console.log(token)
    if (!token) {
        return next(createCustomError('invalid credentials token error', 400))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
        if (err) {
            return next(createCustomError('invalid credentials token error', 400))
        }
        // console.log(user.id)
        req.id = admin.id
    })
    next();
})
const getAdmin = asyncWrapper(async (req, res, next) => {
    const adminId = req.id
    let admin = await Admin.findById(adminId, "-password")
    if (!admin) {
        return next(createCustomError('admin not found', 404))
    }
    res.status(200).json({ admin });
}
)

const refreshAdminToken = asyncWrapper((req, res, next) => {
    const cookie = req.headers.cookie
    const oldToken = cookie.split("=")[1]
    if (!oldToken) {
        return next(createCustomError("something went wrong", 400))
    }
    jwt.verify(String(oldToken), process.env.JWT_SECRET, (err, admin) => {
        if (err) {
            return next(createCustomError("authentification failed", 403))
        }
        res.clearCookie(`${admin._id}`);
        req.cookies[`${admin.id}`] ="";
        const newToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
            expiresIn: "35s"
        })
        res.cookie(String(admin.id), newToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: "lax",
        });
        req.id = admin.id;
        console.log("refresh")
        next();

    })
}
)
const Adminlogout=asyncWrapper(async(req,res,next)=>{
    const cookie = req.headers.cookie
    const oldToken = cookie.split("=")[1]
    console.log(oldToken)
    if (!oldToken) {
        return next(createCustomError("something went wrong", 400))
    }
    jwt.verify(String(oldToken), process.env.JWT_SECRET, (err,admin) => {
        if (err) {
            return next(createCustomError("authentification failed", 403))
        }
        res.clearCookie(`${admin._id}`);
        req.cookies[`${admin.id}`] ="";
        return res.status(200).json({msg:"logged out",success:true})
    })
})
module.exports={
    addAdmin,
    adminLogin,
    getAdmin,
    verifyAdminToken,
    refreshAdminToken,
    Adminlogout
}