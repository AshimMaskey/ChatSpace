import { faBars, faBell, faMagnifyingGlass, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Hamburger } from './Hamburger'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/features/auth/authSlice'

export const Header = () => {
  const dispatch=useDispatch(); 
  const user=useSelector(state=>state.auth.user);
  const handleClick=()=>{
   dispatch(logout());
  }
  const profileInitials=()=>{
    const nameArray = user.username.split(' ');
    const initials = nameArray[0][0] + nameArray[nameArray.length - 1][0];
    return initials.toUpperCase();
  }
  const count=4;
  return (
	<>
  <div className='bg-[#F5F5F5] shadow-md py-4 px-10 md:px-20 flex justify-between'>
    <div>
      <Link to="/">
      <h1 className='text-2xl md:text-3xl hover:cursor-pointer'>ChatSpace</h1>
      </Link>
    </div>
    
    <div className='text-xl md:text-2xl gap-6 md:gap-10 hidden sm:flex'>
        <div className="relative inline-block">
          <NavLink className={({isActive})=>
        `cursor-pointer hover:border-b-[3px] pt-1 pb-1 hover:border-black ${isActive?'border-b-[3px] border-black':''}`} to="/notification">
          <FontAwesomeIcon icon={faBell} className="text-gray-800" />
          {count > 0 && (
            <span
              className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full"
              style={{ transform: 'translate(50%, -50%)' }}
            >
              {count}
            </span>
          )}
        </NavLink>
      </div>
      <div>
        <NavLink className={({isActive})=>
        `cursor-pointer hover:border-b-[3px] pt-1 pb-1 hover:border-black ${isActive?'border-b-[3px] border-black':''}`} to="/search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </NavLink>
      </div>
      <div>
      <NavLink to={`/profile/${user.user_id}`}>
      <Avatar className='border-gray-300 border-2 '>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{profileInitials()}</AvatarFallback>
      </Avatar>
      </NavLink>
      </div>
      <div>
          <AlertDialog>
      <AlertDialogTrigger>
        <FontAwesomeIcon className='text-2xl md:text-3xl cursor-pointer hover:border-b-[3px] pt-1 pb-1 hover:border-black' icon={faRightFromBracket} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>      
      </div>
    </div>
    <div className=' flex content-center sm:hidden'>
    <Hamburger user_id={user.user_id}/>
    </div>
  </div>
  </>
  )
}
