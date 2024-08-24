import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from '@/components/ui/use-toast';

export const SignUpForm = () => {
	const {toast} =useToast();
	const navigate=useNavigate();
	const [showPassword, setShowPassword]=useState({
		password: false,
		confirmPassword: false
	});
	const [signupData,setSignUpData]=useState(
		{
			username:'',
			password:'',
			email:'',
			phone:'',
			confirmPassword:''
		}
	)
	const formData=[
		{
			label: "Username",
			type: "text",
			value: signupData.username,
			name: 'username'
		},
		
		{
			label: "Email",
			type: "email",
			value: signupData.email,
			name: 'email'
		},	
		{
			label: "Phone Number",
			type: "number",
			value: signupData.phone,
			name: 'phone'
		},
		{
			label: "Password",
			type: "password",
			value: signupData.password,
			name: 'password'
		},	 		
		{
			label: "Confirm Password",
			type: "password",
			value: signupData.confirmPassword,
			name: 'confirmPassword'
		},	 		
	]

	const handleTogglePassword = (field) => {
		setShowPassword((prevState) => ({
			...prevState,
			[field]: !prevState[field]
		}));
	}

	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setSignUpData(prevState => ({
			...prevState,
			[name]: value
		}));
	}

	const handleSubmit = async(e) => {
		e.preventDefault();
		try{
			const response=await fetch('http://localhost/chatspace/backend/signup_signin/insert_user.php',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(signupData)
			});
			const result= await response.json();
			if(result.status=='success'){
				toast({
					description: " You have successfully signed up!!"
				})
				navigate('/signin');

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
  return (
	<>
	<div className='flex justify-center items-center h-screen bg-gray-300'>	
		<div className='bg-white border-2 sm:w-96 px-7 py-6 rounded-md border-gray-300 inline-block'>
			<form onSubmit={handleSubmit}>
				<h1 className='text-3xl mb-5 text-center'>Sign Up</h1>
				{
					formData.map((item)=>
						<div key={item.label}>
							<div className='mb-2'>	
								<label className='text-xl' htmlFor={item.label}>{item.label}</label>
							</div>
							<div className='mb-2 relative'>
								<input className='p-1 sm:p-2 w-full border-2 border-gray-300 rounded-md' name={item.name} type={item.type==='password' && showPassword[item.name] ? 'text': item.type}
								value={item.value} onChange={handleChange} id={item.name}/>
								{
									item.type==='password' && (
										<button
											type="button"
											className='absolute inset-y-0 right-2 flex items-center'
											onClick={() => handleTogglePassword(item.name)}
										>
											<FontAwesomeIcon icon={showPassword[item.name] ? faEyeSlash : faEye} />
										</button>
									)
								}
							</div>						
						</div>
					)
				}
				<p className='mb-3'>Already have an account?
					<span className='text-blue-700 underline'>
						<Link to="/signin"> Sign In!</Link>
					</span>
				</p>
				<Button type='submit' className="w-full text-md">Submit</Button>
			</form>
		</div>
	</div>
	</>
  )
}
