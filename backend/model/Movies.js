const mongoose = require("mongoose")
const movieSchemas = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    actors: [{
        name:[{
            type: String,
            required: true
        }],
        image:[{
            type: String,
            required: true
        }],
    }],
    releaseDate: {
        type: Date,
        required: true
    },
    about: {
        type: String,
        required: true,
    },
    genre: [{
        type: String,
        required: true
    }],
    cbfc:
    {
        type: String,
        required: true,
    },
    quality: [{
        type: String,
        required: true
    }],
    languages:[{
        type: String,
        required: true 
    }],
    crew:[{
        type: String,
        required: true
      }],
    posterUrl: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: "Bookings"
    }],
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model("movie", movieSchemas)