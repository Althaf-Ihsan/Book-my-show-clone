import axios from 'axios'
export const getAllMovies=async()=>{
    const res = await axios.get("http://localhost:5000/movie")
      .catch((error) => {
          console.log(error)
      })
  const data = await res.data
  return data.movies
  }