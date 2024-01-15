import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Link } from "react-router-dom";
import { getAllMovies } from '../api-helpers/ApiHelper';

const MovieCard = () => {
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
  getAllMovies().then((data)=>setMovies(data)).catch((err)=>{
    console.log(err)
  })
  },[])

  console.log(movies)
  return (
    <>
      <div className='bg-white'>
        <div className='py-[30px] px-[63px] font-Roboto'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between items-cender'>
              <span className='Recommend-text'>Recommended Movies</span>
              <span className='capitalize exp-text underline'>see all</span>
            </div>
            <div className='movie-card' >
              {movies.map(({ title,posterUrl },index) => {
                return<div className='flex flex-col gap-[4px] cursor-pointer ' key={index}><img className='card-img ' src={posterUrl} />
                  <span className='title pt-[8px] capitalize '>{title}</span>
                  <div>
                  {movies[index].genre.map((genre)=><Link className='text-genreStyle capitalize' key={uuidv4()}>{genre}/</Link>)}
                  </div>
                </div>
                
              })}
              </div>
          </div>
        </div>
        <div className='my-[89px] px-[63px] rounded-lg'>
          <img src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/stream-leadin-web-collection-202210241242.png" />
        </div>
      </div>
    </>
  )
}

export default MovieCard