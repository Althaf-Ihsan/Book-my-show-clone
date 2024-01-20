import React from 'react'
import Home from './components/Home'
import {  RouterProvider ,createBrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import NoPage from './components/NoPage'
import Register from './components/Register'
import Auth from './components/Auth/Auth'
import Admin from './components/Auth/Admin'
import { useSelector } from 'react-redux'
import AdminHome from './components/AdminPage/AdminHome'
import UserPage from './components/User/UserPage'
import Layout from './Layouts/Layout'
import Contact from './components/Contact'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Movies from './components/AdminPage/Movies'
import AddMovie from './components/AdminPage/AddMovie'

const router=createBrowserRouter([{
  path:"/",
  element:<Layout/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path: '*',
      element: <NoPage/>,
    },
    {path:"user",
element: <UserPage/>

},
  ]
},
{path:"admin",
  element: < Admin/>,
  children:[{
    path:"home",
    element:<ProtectedRoute><AdminHome/></ProtectedRoute>
  },
  {
    path: 'movies',
    element:<ProtectedRoute><Movies/></ProtectedRoute>,
    children:[{
      path: 'Add Movie',
      element:<ProtectedRoute><AddMovie/></ProtectedRoute>,
    }]
  },
]
},
])

const App = () => {
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)
  console.log(isUserLoggedIn)
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
   
    </>
  )
}

export default App