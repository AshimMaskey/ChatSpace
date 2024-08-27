import React, { useEffect, useState } from 'react'
import { ProfileImage } from './ProfileImage'
import { ProfileDesc } from './ProfileDesc'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

const Profile = () => {
  const authUser=useSelector(state=>state.auth.user);
  const [user,setUser]=useState(null);
  const location=useLocation();
  const {user_id}=useParams();
  const [isUser,setIsUser]=useState(false);
  useEffect(() => {
    if (authUser.user_id == user_id) {
      setIsUser(true);
    } else {
      setIsUser(location.state?.isUser || false);
    }
  }, [authUser.user_id, user_id, location.state]);

  useEffect(()=>{
    const fetchUser=async()=>{
      const response=await fetch(`http://localhost/chatspace/backend/select_user/select_user.php?user_id=${user_id}`,{
        method:'GET'
      });
      const result=await response.json();
      setUser(result.user);
    }
    fetchUser();

  },[user_id]);

  if(!user){
    return <div>loading....</div>
  }

  return (
	<>
  <ProfileImage/>
  <ProfileDesc user={user} isUser={isUser}/>
  </>
  )
}

export default Profile