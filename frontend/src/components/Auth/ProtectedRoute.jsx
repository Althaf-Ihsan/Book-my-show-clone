import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
    let location=useLocation();
    if(!isAdminLoggedIn)
    {
        return<Navigate to="/admin" state={{ from: location}} replace/>
    }
  return  children

}

export default ProtectedRoute