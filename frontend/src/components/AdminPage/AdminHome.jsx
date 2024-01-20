import React, { useEffect, useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true
let flag = true
const AdminHome = () => {
    const [admin,setAdmin]=useState()
    const refreshToken = async () => {
        const res = await axios.get("http://localhost:5000/admin/refresh",{ withCredentials:true})
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
        if(flag){
          flag = false
          passRequest().then((data) => {setAdmin(data.admin)})
        }
        let interval = setInterval(() => {
          refreshToken().then((data) => {setAdmin(data.admin)})
        }, 1000*29)
        return () => clearInterval(interval)
      },[])
    return (
        <div>{admin && <><p>{admin.email}</p></>}</div>
    )
}

export default AdminHome