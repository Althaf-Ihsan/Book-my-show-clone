require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const cookieParser = require("cookie-parser")
const notFound=require("./middlewares/notFound")
const port=process.env.PORT || 4000
const userRouter=require("./routes/User");
const adminRouter=require("./routes/Admin")
const movieRouter=require("./routes/Movie")
const bookingRouter=require("./routes/Booking")
const cors = require("cors")
const errorHandler = require("./middlewares/ErrorhandlingMiddleware");
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://127.0.0.1:5173/ ","http://localhost:5173"],
    credentials:true
}))
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/movie",movieRouter )
app.use("/booking",bookingRouter)
app.use(notFound)
app.use(errorHandler)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log("server started")
        })
    }
    catch (err) {
        console.log(err)
    }
}
start();