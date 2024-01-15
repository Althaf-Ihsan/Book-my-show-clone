const jwt = require("jsonwebtoken")
const Movie = require("../model/Movies")
const mongoose = require("mongoose")
const Admin = require("../model/Admin")
const addMovie = async (req, res) => {
    const cookie = req.headers.cookie
    const extractedToken = cookie.split("=")[1]
    console.log(extractedToken)
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "token not found" })
    }
    let adminId;
    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            return res.status(404).json({ message: err.message })
        }
        adminId = decrypted.id;

    })
    const { title, duration,about,genre,cbfc,quality,languages,crew, releaseDate, posterUrl, featured, actors } = req.body
   try{
    if (!title || title.trim() === "" ||!duration|| !releaseDate || releaseDate.trim() === "" ||!genre||!crew||!languages||!cbfc||!quality|| !about || about.trim() === "" || !posterUrl || posterUrl.trim() === "" || !featured || !actors) {
        return res.status(422).json({ message: "invalid Input" })
    }
   }
   catch(err)
   {
    console.log(err)
   }
    let movie;
    try {

        movie = new Movie({
            title,
             duration,
             actors,
             releaseDate: new Date(`${releaseDate}`),
             about,
             genre,
             cbfc,
             languages,
             quality,
             crew,
            posterUrl,
            featured,
            admin: adminId
        })
        const session=await mongoose.startSession();
        const adminUser=await Admin.findById(adminId)
        session.startTransaction();
        await movie.save({session});
        adminUser.addMovies.push(movie)
        await adminUser.save({session})
        session.commitTransaction()
    }
    catch (err) {
        console.log(err)
    }
    if (!movie) {
        return res.status(500).json({ message: "request failed" })
    }
    res.status(200).json({ movie })
}

const getMovies = async (req, res, next) => {
    let movies;
    try {
        movies = await Movie.find({})
    }
    catch (err) {
        console.log(err)
    }
    if (!movies) {
        return res.status(500).json({ message: "request failed" })
    }
    return res.status(200).json({ movies })
}
const getMoviesById = async (req, res, next) => {
    const id=req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id)
    }
    catch (err) {
        console.log(err)
    }
    if (!movie) {
        return res.status(500).json({ message: "request failed" })
    }
    return res.status(200).json({ movie })
}
module.exports = { addMovie, getMovies,getMoviesById }