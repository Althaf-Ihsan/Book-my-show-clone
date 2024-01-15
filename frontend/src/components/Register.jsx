import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = ({registerPage,setRegisterPage}) => {
  const navigate=useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handelChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
      
    }
    const senderFunction = async () => {
        const res = await axios.post("http://localhost:5000/user/signUp",{
          email: formData.email,
          password: formData.password
        })
        .catch((error) => {
          console.log(error)
        })
        console.log(res)
        const data = await res.data
        console.log(data)
       }
       const handleSubmit = (e) => {
        e.preventDefault()
        senderFunction().then(() => {navigate("/login")
        setRegisterPage(!registerPage)
       })
       }
  return (
  <>
  <form className='flex flex-col ' onSubmit={handleSubmit}>
  <div className='flex w-full flex-row items-center justify-center mt-32'>
  <span className='text-xl font-semibold '>Create Account</span>
  </div>
  <div className='flex flex-col gap-3 justify-center items-center mt-[40px]'>
      <div className="md:w-2/3 flex flex-col gap-2">
        
              <input name="email" type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-center  sm:text-sm sm:leading-6" placeholder='Enter Email' onChange={handelChange}/>
              <input name="password" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-center  sm:text-sm sm:leading-6" placeholder='Enter Password' onChange={handelChange}/>
         
      </div>
  <button  className="w-1/3 text-white bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-3">Sign up</button>
      </div>
  </form>
  </>
  )
}

export default Register