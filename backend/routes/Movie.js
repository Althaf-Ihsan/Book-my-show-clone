const express=require("express");
const { addMovie, getMovies, getMoviesById } = require("../controllers/movieController");
const router=express.Router();
router.post("/",addMovie)
router.get("/",getMovies)
router.get("/:id",getMoviesById)
module.exports=router