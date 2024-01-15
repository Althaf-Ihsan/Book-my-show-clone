const asyncWrapper = require("../middlewares/async")
const bcrypt = require("bcryptjs")
const User = require("../model/user");
const Bookings=require('../model/Bookings')
const jwt = require("jsonwebtoken")
const { createCustomError } = require("../middlewares/custom-error");
const getAllUsers = asyncWrapper(async (req, res, next) => {

    let users = await User.find({})
    if (!users) {
        return next(createCustomError('no user', 400))
    }
    res.status(200).json({ users: users, success: true })
}
)
const signUp = asyncWrapper(async (req, res, next) => {
    let existingUser;
    const { email, password} = req.body
    console.log(req.body)
    if ( !email || !password ) {
        return next(createCustomError("Invalid Input", 422))
    }
    existingUser = await User.findOne({ email: email })
    if (existingUser) {
        return next(createCustomError("user already exist", 400))
    }
    const cipherText = bcrypt.hashSync(password)
    const user = new User({
        email: email,
        password: cipherText
    })
    await user.save();
    res.status(201).json({ user: user })
})
const login = asyncWrapper(async (req, res, next) => {
    let existingUser;
    const { email, password } = req.body
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return next(createCustomError("Invalid Input", 422))
    }
    existingUser = await User.findOne({ email: email })
    if (!existingUser) {
        return next(createCustomError(`${email} is not registered`, 400))
    }
    const comparePassword = bcrypt.compareSync(password, existingUser.password)
    if (!comparePassword) {
        return next(createCustomError("Incorrect password", 400))
    }
    const userToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "35s",
    })
    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = "";
    }
    res.cookie(String(existingUser._id), userToken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax"
    })
    res.status(200).json({ msg: "login successfull", success: true, userToken })

})
const verifyToken = asyncWrapper(async (req, res, next) => {
    const cookie = req.headers.cookie
    const token = cookie.split("=")[1]
    console.log(token)
    if (!token) {
        return next(createCustomError('invalid credentials token error', 400))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createCustomError('invalid credentials token error', 400))
        }
        // console.log(user.id)
        req.id = user.id
    })
    next();
})
const getUser = asyncWrapper(async (req, res, next) => {
    const userId = req.id
    let user = await User.findById(userId, "-password")
    if (!user) {
        return next(createCustomError('User not found', 404))
    }
    res.status(200).json({ user });
}
)
const refreshToken = asyncWrapper((req, res, next) => {
    const cookie = req.headers.cookie
    const oldToken = cookie.split("=")[1]
    if (!oldToken) {
        return next(createCustomError("something went wrong", 400))
    }
    jwt.verify(String(oldToken), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createCustomError("authentification failed", 403))
        }
        res.clearCookie(`${user._id}`);
        req.cookies[`${user.id}`] ="";
        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "35s"
        })
        res.cookie(String(user.id), newToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: "lax",
        });
        req.id = user.id;
        console.log("refresh")
        next();

    })
}
)
const getBookingsUser=async(req,res,next)=>{
    const id=req.params.id;
    let bookings;
    try{
bookings=await Bookings.find({user:id})
    }
    catch(err)
    {
        console.log(err)
    }
    if(!bookings){
        return res.status(400).json({message:`no bokings in the id ${id}`})
    }
    res.status(200).json({bookings})
}
const logout=asyncWrapper(async(req,res,next)=>{
    const cookie = req.headers.cookie
    const oldToken = cookie.split("=")[1]
    if (!oldToken) {
        return next(createCustomError("something went wrong", 400))
    }
    jwt.verify(String(oldToken), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createCustomError("authentification failed", 403))
        }
        res.clearCookie(`${user._id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({msg:"logged out",success:true})
    })
})
module.exports = {
    getAllUsers,
    signUp,
    login,
    verifyToken,
    getUser,
    refreshToken,
    logout,
    getBookingsUser
}