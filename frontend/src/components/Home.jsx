import React from 'react'
import Carousel from './Carousel'
import MovieCard from './MovieCard'
import EventSection from './EventSection'
import Navbar from './Navbar'
import Footer from './Footer'
const Home = () => {
  return (
    <>
    <Navbar/>
    <Carousel/>
    <MovieCard/>
    <EventSection/> 
    <Footer/>   
    </>
  )
}

export default Home