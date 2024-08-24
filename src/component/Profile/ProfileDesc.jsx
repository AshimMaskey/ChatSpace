import { Button } from '@/components/ui/button'
import React from 'react'

export const ProfileDesc = () => {
	const isUser=false;
	const profileData=[
		{
			label:'Username',
			data:'Ashim Maskey'
		},
		{
			label:'Email',
			data:'ashimmaskey9@gmail.com'
		},
		{
			label:'Phone Number',
			data: 9818011734
		}
	]
  return (
	<>
	<div className='flex justify-center'>
	<div className='mt-28 bg-gray-500 inline-block rounded-sm p-5 sm:p-7'>
		{
			profileData.map(item=><h1 className='font-bold text-white p-3 text-lg sm:text-xl'>
				{item.label}: <span className='text-sm sm:text-lg font-semibold'>{item.data}</span>
			</h1>)
		}
		{
			isUser?(<Button className='w-full text-md'>Add Friend</Button>):null
		}
	</div>
	</div>
	</>
  )
}
