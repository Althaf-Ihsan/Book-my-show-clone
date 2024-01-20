import React, { useEffect, useState } from 'react'
import close from '../assets/images/close.svg'
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthprovider } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import Register from './Register';
import { useDispatch } from 'react-redux';
import { userActions } from '../Store';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const Login = ({ loginBox, setLoginBox }) => {
    const [visible,setVisible]=useState(false)
    const dispatch=useDispatch();
    AOS.init({
        once: true,
    });
    const [email, setEmail] = useState('')
    const [registerPage,setRegisterPage]=useState(false)
    const [user,setUser]=useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handelChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleSignInwithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuthprovider).then((data) => {
                setEmail(data.user.email)
                localStorage.setItem("email", data.user.email)
            })
            setLoginBox(!loginBox)
            dispatch(userActions.login())
            navigate("/user")
        }
        catch (err) {
            console.log(err)
        }

    }
    const senderFunction = async () => {
        const res = await axios.post("http://localhost:5000/user/login", {
            email: formData.email,
            password: formData.password
        })
            .catch((error) => {
                console.log(error)
            })
        console.log(res)
        const data = await res.data.user
        return data
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        senderFunction()
        .then(() => {
            setLoginBox(!loginBox)
            dispatch(userActions.login())
            navigate("/user")})
    }
    useEffect(() => {
        setEmail(localStorage.getItem('email'))
    })
    return (
        <div className=' flex justify-center '>
            <div className='absolute  z-50 w-[427px] h-[584px] bg-gray-300 rounded-xl  top-4' data-aos="fade-down"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="300"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-center">
                   {registerPage ?<Register registerPage={registerPage} setRegisterPage={setRegisterPage}/>:<>
                    <div className='flex justify-start gap-32 items-center pl-44 login-text mt-[29px]'><span className='capitalize'>get started</span><img src={close} onClick={() => setLoginBox(!loginBox)}
                    /></div>
                    <div className='flex flex-col justify-center gap-3 mt-[50px]'>
                        <div className='capitalize flex flex-row  gap-14 login-box mx-[50px] cursor-pointer' onClick={handleSignInwithGoogle}><img src="https://in.bmscdn.com/webin/common/icons/googlelogo.svg" width={19} height={10} /><span className='cursor-pointer'>continue with google</span></div>
                        <div className='capitalize flex flex-row  gap-14 login-box mx-[50px] cursor-pointer' ><img src="https://in.bmscdn.com/webin/common/icons/email.svg" /><span className='cursor-pointer'>continue with email</span></div>
    
                    </div>
                    <form className='flex flex-col gap-3'  onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2 justify-center items-center mt-[25px]'>
                        <span>OR</span>
                        <div className="md:w-2/3 flex flex-col gap-2">
                          
                                <input name="email" type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-center  sm:text-sm sm:leading-6" placeholder='Enter Email' onChange={handelChange}></input>
                                <div className='relative'><input name="password" type={visible?"text":"password"} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-center  sm:text-sm sm:leading-6" placeholder='Enter Password' onChange={handelChange}></input>
                              {visible?<AiOutlineEye size={18} className='absolute top-2 right-2' onClick={()=>setVisible(!visible)}/>:<AiOutlineEyeInvisible size={18} className='absolute top-2 right-2'  onClick={()=>setVisible(!visible)}/>}  
                                </div>
                                
                           
                        </div>
                        <button type="submit" className="w-1/3 text-white bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-3">Sign in</button>
                        <Link className="font-semibold text-[15px] leading-6 text-slate-600 hover:text-slate-500"  onClick={()=>setRegisterPage(!registerPage)}>Register For New Account</Link>
                    </div>
                    </form>
                    </>
                }
               
            </div>
        </div>

    )
}

export default Login
