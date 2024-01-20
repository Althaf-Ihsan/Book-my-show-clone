import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import Carousel from '../Carousel'
import MovieCard from '../MovieCard'
import EventSection from '../EventSection'
import Footer from '../Footer'
axios.defaults.withCredentials = true
let flag = true
const UserPage = () => {
  const [user,setUser]=useState()
  const refreshToken = async () => {
      const res = await axios.get("http://localhost:5000/user/refresh",{ withCredentials:true})
          .catch((error) => {
              console.log(error)
          })
          console.log(res)
          const data = await res.data
          return data
  }
  const passRequest = async() => {
      const res = await axios.get("http://localhost:5000/user/verify", {
        withCredentials:true
      })
      .catch((error) => {
        console.log(error)
      })
      console.log(res)
      const data = await res.data
      return data
    }
    useEffect(() => {
      if(flag){
        flag = false
        passRequest().then((data) => {setUser(data.user)})
      }
      let interval = setInterval(() => {
        refreshToken().then((data) => {setUser(data.user)})
      }, 1000*29)
      return () => clearInterval(interval)
    },[])
  return (
    <>
  
    <Carousel/>
   <MovieCard/>
    <EventSection/>
   
    </>
  )
}

export default UserPage