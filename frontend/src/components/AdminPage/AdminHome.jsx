import React, { useEffect } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true
let flag = true
const AdminHome = () => {
    const refreshToken = async () => {
        const res = await axios.get("http://localhost:5000/admin/refresh",)
            .catch((error) => {
                console.log(error)
            })
            console.log(res)
            const data = await res.data
            return data
    }
    const passRequest = async() => {
        const res = await axios.get("http://localhost:5000/admin/verify", {
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
          
      },[])
    return (
        <div>AdminHome</div>
    )
}

export default AdminHome