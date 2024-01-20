import React, { useContext, useState } from 'react'
import svg from '../assets/images/logo.svg'
import search from '../assets/images/search.svg'
import select from '../assets/images/select.svg'
import menu from '../assets/images/menu.svg'
import Sidebar from './Sidebar'
import Login from './Login'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)
  const listItems = [
    { id: 1, value: "movies" },
    { id: 2, value: "stream" },
    { id: 3, value: "event" },
    { id: 4, value: "plays" },
    { id: 5, value: "sports" },
    { id: 6, value: "activities" },
    { id: 7, value: "ListYourShow" },
    { id: 8, value: "corporates" },
    { id: 9, value: "offers" },
    { id: 10, value: "gift cards" },
  ]
  const [input,setInput]=useState("")
  const [sidebar,setSideBar]=useState(false)
  const [loginBox,setLoginBox]=useState(false)
  console.log(loginBox)
  return (
    <>
      <div className='header '>
        <div className='container h-[64px] flex items-center justify-between'>
          <div className='flex flex-row pl-[63px] gap-5'>
            <img src={svg} />
            <input type="text" className='input-search px-10 relative  outline-none' placeholder='Search for movies,sports,events' />
            <div className='absolute left-[210px] top-[25px]'>
              <img src={search} className='w-[13px] h-[13px] ' />
            </div>
          </div>
          <div className='flex flex-row gap-1 -mr-[25px]'>
            <div>
              <span className='city-icon city text-navText'>Kochi</span>
            </div>
            <div className='mt-1'>
              <img src={select} className='overflow-hidden' />
            </div>
            {isUserLoggedIn?<><div>
              <img src="https://assets-in.bmscdn.com/static/2023/10/default-pic.png" className='login-image cursor-pointer'/>
              </div>
              <div>
             <span className='login-name cursor-pointer' onClick={()=>setSideBar(!sidebar)}>Hi,</span>
              </div></>:<> <div>
              <Link className='signIn-btn mx-3'  onClick={()=>setLoginBox(!loginBox)}>Sign in</Link>
            </div>
            <div className='mt-1 '>
              <img src={menu} className='overflow-hidden mx-2'  onClick={()=>setSideBar(!sidebar)} />
            </div></>}
           

          </div>
        </div>
        <div className='sub-container flex flex-row h-[40px] w-full items-center justify-between'>
          <ul className='flex gap-5 pl-[63px] capitalize  font-normal '>
            {listItems.slice(0, 6).map(({ id, value }) => <li className='text-[14px] text-listBg cursor-pointer' key={id}>{value}</li>)}
          </ul>
          <ul className='flex  pr-[46px] capitalize text-[14px] font-normal '>
            {listItems.slice(6, 11).map(({ id, value }) => <li className='text-[12px] px-[12px] text-listBg cursor-pointer' key={id}>{value}</li>)}
          </ul>
        </div>
      </div>
     {sidebar && <Sidebar sidebar={sidebar} setSideBar={setSideBar} loginBox={loginBox} setLoginBox={setLoginBox}/>} 
     {loginBox && <Login loginBox={loginBox} setLoginBox={setLoginBox}/>}
    </>


  )
}

export default Navbar