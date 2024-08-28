import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const ProfileDesc = ({user, isUser}) => {
	const sender_id=useSelector(state=>state.auth.user.user_id);
	const [friendStatus,setFriendStatus]=useState('');

	const fetchStatus=async()=>{
		try{
			const response=await fetch('http://localhost/chatspace/backend/friend_request/fetchStatus.php',{
				method:'POST',
				headers:{
					'Content-Type':'application/json'
				},
				body:JSON.stringify({sender_id: sender_id, receiver_id: user.user_id})
			});
			const result=await response.json();
			if(result.success===true){
				setFriendStatus(result.status);
			}
			else{
				// console.error(result.message);
			}
		}
		catch{
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
          		description: "There was some problem.",
			})
		}
	}
	useEffect(()=>{
		fetchStatus();
	},[user, sender_id]);

	const handleClick=async(receiver_id)=>{
		try{
			const response=await fetch('http://localhost/chatspace/backend/friend_request/insert_request.php',{
				method:'POST',
				headers:{
					'Content-Type':'application/json'
				},
				body:JSON.stringify({sender_id: sender_id, receiver_id: receiver_id})
			});
			const result=await response.json();
			if(result.success===true)
			{
				toast({
					description:result.message
				});
				setFriendStatus('pending');
			}
			else{
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					  description: result.message,
				})
			}		
		}
		catch{
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
          		description: "There was a problem with your request.",
			})
		}
	}
	const profileData=[
		{
			label:'Username',
			data: user.username
		},
		{
			label:'Email',
			data:user.email
		},
		{
			label:'Phone Number',
			data: user.phone_number
		}
	]

	const showButton=()=>{
		switch(friendStatus)
		{
			case 'pending':
				return(
					<Button disabled className='w-full text-md bg-white text-black'>
						Request Sent
					</Button>
				)
			case 'accepted':
				return(
					<Button disabled className='w-full text-md bg-white text-black'>
						You're friends!
					</Button>
				)
			case 'declined':
				return(
					<Button onClick={()=>handleClick(user.user_id)} className='w-full bg-white text-black hover:bg-gray-200 duration-200 text-md'>
						Add Friend
					</Button>
				)
			default:
				return(
					<Button onClick={()=>handleClick(user.user_id)} className='w-full bg-white text-black hover:bg-gray-200 duration-200 text-md'>
						Add Friend
					</Button>
				)

		}
	}
  return (
	<>
	<div className='flex justify-center'>
	<div className='mt-28 bg-gray-500 inline-block rounded-sm p-5 sm:p-7'>
		{
			profileData.map((item, index)=><h1 key={index} className='font-bold text-white p-3 text-lg sm:text-xl'>
				{item.label}: <span className='text-sm sm:text-lg font-semibold'>{item.data}</span>
			</h1>)
		}
		{
			!isUser &&showButton()
		}
	</div>
	</div>
	</>
  )
}
