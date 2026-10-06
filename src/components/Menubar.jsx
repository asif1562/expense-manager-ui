import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, SidebarIcon, User, X } from 'lucide-react';
import { assets } from '../assets/assets';
import Sidebar from './Sidebar';

const Menubar = ({activeMenu}) => {

    const [openSideMenu,setOpenSideMenu] = useState(false);
    const [showDropdown,setShowDropdown] = useState(false);

    const dropDownRef = useRef(null);
    const {user, clearUser} = useContext(AppContext);

    const navigate = useNavigate();

    // const handleDropdownToggle = (event)=>{
            
    //         setShowDropdown(!showDropdown);
    // }

    const handleLogout =() =>{
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/home");
    }

    useEffect(()=>{
        const handleClickOutside = (event)=> {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setShowDropdown(false);
            }
        }

        if(showDropdown){
            document.addEventListener("mousedown",handleClickOutside);
        }

        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside)
        }
    })

  return (
    <div className='flex items-center-safe justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-5 shadow-sm sm:px-7 sticky top-0 z-30'>

           {/*Left side - Menu button and title*/}
            <div className='flex items-center-safe gap-5'>
            <button 
                onClick={()=>setOpenSideMenu(!openSideMenu)} 
                className='block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors'>
                {openSideMenu ? (
                    <X className='text-2xl'/>
                ) : (<Menu className='text-2xl'/>) }
            </button>
            <div onClick={()=>navigate("/dashboard")} 
                className='flex items-center gap-4'>
                <img src={assets.logo} className='h-10 w-10 ' alt="logo" />
                <span className='text-lg font-medium text-black truncate'>Manage ur Expense</span>
            </div>
          </div>

           {/*Right side - Avatar photo */}

            <div className='relative' ref={dropDownRef}>
                <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className='flex items-center-safe cursor-pointer justify-center-safe w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2'>
                    <User className='w-4 h-4 text-purple-600'/>
                </button>

                  {/*dropdown menu*/}
                    {showDropdown && (
                        <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>
                            {/*user info*/}
                            <div className='px-4 py-2 border-b border-gray-100'>
                                <div className='flex items-center-safe gap-3'>
                                    <div className='flex items-center-safe justify-center-safe w-8 h-8 bg-gray-100 rounded-full'>
                                        <User className='w-4 h-4 text-purple-600'/>
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm font-medium text-gray-800 truncate'>
                                            {user.fullName}
                                        </p>
                                        <p className='text-sm text-gray-500 truncate'>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/*dropdown options*/}
                                <div className='py-1'>
                                    <button
                                         onClick={handleLogout}
                                         className='flex items-center-safe cursor-pointer gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150'>
                                         <LogOut className='w-4 h-4 text-gray-500'/>
                                         <span>Logout</span>
                                    </button>
                                </div>
                    
                        </div>)
                    }

             </div>
            

                {openSideMenu && (
                <div className="fixed top-[80px] left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
                <Sidebar activeMenu={activeMenu} />
                </div>
                )}
    </div>
  )
}

export default Menubar