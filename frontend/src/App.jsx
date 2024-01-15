import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import NoPage from './components/NoPage'
import Footer from './components/Footer'
import Register from './components/Register'
import Auth from './components/Auth/Auth'
import Admin from './components/Auth/Admin'
import { useSelector } from 'react-redux'
import AdminHome from './components/AdminPage/AdminHome'



const App = () => {
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)
  console.log(isAdminLoggedIn)
  return (
    <>
    <Routes>
    <Route path="/"  element={<Home/>}>
    <Route path='login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
    </Route>
    <Route path="/admin/" element={<Admin/>}/>
    <Route path="/admin/home" element={<AdminHome/>}/>
    </Routes>
    </>
  )
}

export default App