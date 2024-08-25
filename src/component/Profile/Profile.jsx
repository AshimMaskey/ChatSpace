import React from 'react'
import { ProfileImage } from './ProfileImage'
import { ProfileDesc } from './ProfileDesc'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user=useSelector(state=>state.auth.user);
  return (
	<>
  <ProfileImage/>
  <ProfileDesc user={user}/>
  </>
  )
}

export default Profile