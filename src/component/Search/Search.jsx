import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Search = () => {
  const [searchedValue, setSearchedValue]=useState('');
  const [error, setError]=useState(null);
  const handleChange=(e)=>{
    setSearchedValue(e.target.value);
  }

  const handleSubmit=()=>{
    if(searchedValue.length<3 || searchedValue=='')
      setError(' Length of word should be more than two!');
    else
    {
      setError(null);
      console.log(searchedValue);
    }
  }

  const handleKeyPress=(e)=>{
    if(e.key=='Enter')
    {
      handleSubmit();
    }
  }

  return (
    <>
    <div className="mt-7 flex justify-center">
      <div className="relative w-2/3">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          onClick={handleSubmit}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          className="pl-10 pr-5 py-3 text-lg rounded-md border-gray-400 border-2 w-full"
          type="text"
          value={searchedValue}
          name='search'
          onKeyDown={handleKeyPress}
          onChange={(e)=>handleChange(e)}
          placeholder="Search the user"
        />
      </div>
    </div>
      <div className='flex justify-center mt-10'>
        {
          error && <div>
            <span className='text-red-500 text-lg'>
              {error}
            </span>
          </div>
        }
      </div>
    </>
  );
}

export default Search;
