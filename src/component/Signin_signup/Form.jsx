import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { login } from '@/features/auth/authSlice';

export const Form = () => {
	const navigate=useNavigate();
	const dispatch=useDispatch();
	const [showPassword, setShowPassword]=useState(false);
	const [error, setError]=useState(null);
	const [signinData,setSignInData]=useState(
		{
			username:'',
			password:''
		}
	)
	const formData=[
		{
			label: "Username",
			type: "text",
			value: signinData.username,
			name: 'username'
		},
		{
			label: "Password",
			type: "password",
			value: signinData.password,
			name: 'password'
		},	
	]
	const handleTogglePassword=()=>{
		setShowPassword(!showPassword);

	}
	const handleChange = (e) => {
		const { name, value } = e.target;
		setSignInData(prevState => ({
			...prevState,
			[name]: value
		}));
	}

	const handleSubmit = async(e) => {
		e.preventDefault();
		try{
			const response=await fetch('http://localhost/chatspace/backend/signup_signin/signin.php',{
				method:'POST',
				headers:{
					'Content-Type':'application/json'
				},
				body: JSON.stringify(signinData)
			})
			const result=await response.json();
			if(result.success==true){
				console.log(result);
				setError(null);
				dispatch(login(result.user));
				toast({
					description: " You have successfully logged in!!"
				})
			}
			else{
				setError(result.message);
			}
		}
		catch{
			setError(null);
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
          		description: "There was a problem with your request.",
			})
		}
	}
  return (
	<>
	<div className='flex justify-center items-center h-screen bg-gray-300'>	
		<div className='bg-white border-2 sm:w-96 px-7 py-6 rounded-md border-gray-300 inline-block'>
			<form onSubmit={handleSubmit}>
				<h1 className='text-3xl mb-5 text-center'>Sign In</h1>
				{
					formData.map((item)=>
						<div key={item.label}>
							<div className='mb-2'>	
								<label className='text-xl' htmlFor={item.label}>{item.label}</label>
							</div>
							<div className='mb-2 relative'>
								<input className='p-1 sm:p-2 w-full border-2 border-gray-300 rounded-md' name={item.name} type={item.type==='password' && showPassword ? 'text': item.type}
								value={item.value} onChange={handleChange} id={item.name}/>
								{
									item.type==='password' && (
										<button
											type="button"
											className='absolute inset-y-0 right-2 flex items-center'
											onClick={handleTogglePassword}
										>
											<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
										</button>
									)
								}
							</div>						
						</div>
					)
				}
				<span className='text-red-500'>{error}</span>
				<p className='mb-3'>Don't have any account?
					<span className='text-blue-700 underline'>
						<Link to="/signup"> Sign Up!</Link>
					</span>
				</p>
				<Button type='submit' className="w-full text-md">Submit</Button>
			</form>
		</div>
	</div>
	</>
  )
}
