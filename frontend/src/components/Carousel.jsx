import React from 'react'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const Carousel=()=>{
  const images=[
    {id:1,path:"https://assets-in.bmscdn.com/promotions/cms/creatives/1702972896237_frides.jpg"},
    {id:2,path:"https://assets-in.bmscdn.com/promotions/cms/creatives/1701423585546_lollapaloozadesktop.jpg"},
    {id:3,path:"https://assets-in.bmscdn.com/promotions/cms/creatives/1702968877357_harishankarweb.jpg"}
  ]
  return (
<div className='banner-img overflow-hidden height-[307px]  w-full  py-[11px]  '>
<div   className='height-[296px]  pl-[58px]  '>
<Splide  options={ {
  autoplay:true,
  rewind     : true,
  speed: 300,
  rewindSpeed: 1000,

 } } >
     {images.map(({id,path})=><SplideSlide key={id}>
     <img key={id} src={path}  className='cursor-pointer'/>
     </SplideSlide>)}

 </Splide>
</div>
</div>
  )
}

export default Carousel