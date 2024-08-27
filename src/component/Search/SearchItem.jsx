import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({searchResult}) => {
  return (
	<>
		{
			searchResult && <div className='flex justify-center'>
			<div className='w-2/3 gap-x-20 gap-y-5 flex-wrap flex'>
				{
					searchResult.map((item,index)=>
						<Link key={index} to={`/profile/${item.user_id}`} state={{isUser:false}}>
					<div className='w-64 cursor-pointer hover:bg-slate-500 duration-300 shadow-md bg-gray-600 text-white flex justify-start items-center py-4 text-lg rounded-md border-gray-400 border-2'>
						<div className='pl-4'>
							<FontAwesomeIcon icon={faUser} />
							<span className='pl-3 italic'>
							{
								item.username
							}
							</span>
						</div>
					</div>
				</Link>
					)
				}
			</div>
			</div>
		}
	</>
  )
}

export default SearchItem