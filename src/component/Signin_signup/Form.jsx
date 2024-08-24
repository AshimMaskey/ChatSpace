import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Form = () => {
	const [showPassword, setShowPassword]=useState(false);
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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted", signinData);
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
