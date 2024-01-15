import React, { useContext } from 'react'
import bell from '../assets/images/bell.svg'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import { Link } from 'react-router-dom';

const Sidebar = ({sidebar,setSideBar,loginBox,setLoginBox}) => {

    useLockBodyScroll();
    return (


        <>
        <div className="absolute h-screen z-50 top-0 left-0 right-0 ">
         <div className=' fade-section absolute left-0 w-full   h-screen ' onClick={()=>setSideBar(!sidebar)} ></div>
        <ul className='absolute right-0  w-[345px] bg-white sidebar-list h-screen '>
        <li> <span className='text-[22px] leading-3 font-semibold '>Hey!</span></li>
        <li className='shadow-lg'> <div className='flex flex-row items-center  '>
            <img src="https://in.bmscdn.com/webin/movies/superstar/rewards_login.png" className='h-[40px] w-[40px]' />
            <div className='sidebar-text flex justify-start items-stretch'>Unlock special offers &amp; great benefits</div>
            <button className="  font-medium text-loginBtn   rounded-lg ">
                <span className='text-[12px] text-Roboto' onClick={()=>{setSideBar(!sidebar)
                 setLoginBox(!loginBox)
                }
                }><Link to="/login">Login/Register</Link></span>
            </button></div>
        </li>
        <li className='cursor-pointer capitalize text-[14px] hover:bg-hoverBg transition duration-300 '><div className='flex flex-row gap-4'><img src={bell} /><span>Notifications</span></div></li>
        <li className='cursor-pointer capitalize text-[14px] hover:bg-hoverBg transition duration-300 '><div className='flex flex-row gap-4'><img src="https://assets-in.bmscdn.com/members/common/icons/rewards_1.png"  height={20} width={20}/><span>your orders</span></div></li>
        <li className='cursor-pointer capitalize text-[14px] hover:bg-hoverBg transition duration-300 '><div className='flex flex-row gap-4'><img src="https://assets-in.bmscdn.com/members/common/icons/purchasehistory.png"height={20} width={20} /><span>stream library</span></div></li>
        <li className='cursor-pointer capitalize text-[14px] hover:bg-hoverBg transition duration-300 '><div className='flex flex-row gap-4'><img src="https://assets-in.bmscdn.com/members/common/icons/playcreditcard.png" height={20} width={20}/><span>playcreditcard</span></div></li>
        <li className='cursor-pointer capitalize text-[14px] hover:bg-hoverBg transition duration-300 '><div className='flex flex-row gap-4'><img src="https://assets-in.bmscdn.com/members/common/icons/helpandsupport.png" height={20} width={20}/><span>Help & support</span></div></li>
        <li className='cursor-pointer capitalize text-[14px] hover:bg-hoverBg transition duration-300 '><div className='flex flex-row gap-4'><img src=" https://assets-in.bmscdn.com/members/common/icons/accountandsettings.png" height={20} width={20}/><span>Accounts & Settings</span></div></li>
        <li className='cursor-pointer capitalize text-[14px] hover:bg-hoverBg transition duration-300 '><div className='flex flex-row gap-4'><img src="https://assets-in.bmscdn.com/members/common/icons/rewards_1.png" height={20} width={20}/><span>rewards</span></div></li>
        <li className='cursor-pointer capitalize text-[14px] hover:bg-hoverBg transition duration-300 '><div className='flex flex-row gap-4'><img src="https://assets-in.bmscdn.com/members/common/icons/bookasmile.png" height={20} width={20}/><span>book a smile</span></div></li>

    </ul>

        </div>
            
        </>
    )
}

export default Sidebar