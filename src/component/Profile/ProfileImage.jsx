import React from 'react'
import profile from '../../images/user.png'

export const ProfileImage = () => {
  return (
	<>
	<div className='bg-gray-500 h-28 md:h-40 flex justify-center items-center relative'>
		<img className='w-32 md:w-44 absolute top-[35%]' src={profile} alt="" />
	</div>
	</>
  )
}

