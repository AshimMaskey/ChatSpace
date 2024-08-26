import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SearchItem from './SearchItem';

const Search = () => {
  const [searchedValue, setSearchedValue]=useState('');
  const [searchResult,setSearchResult]=useState(null);
  const [error, setError]=useState(null);
  const handleChange=(e)=>{
    setSearchedValue(e.target.value);
  }

  const handleSubmit=async()=>{
    if(searchedValue.length<3 || searchedValue=='')
    {
      setError(' Length of word should be more than two!');
      setSearchResult(null);
    }
    else
    {
      try{
        const response=await fetch(`http://localhost/chatspace/backend/search_user/search_user.php?searchQuery=${searchedValue}`,{
          method: 'GET'
        });
        const result=await response.json();
        if(result.success===true){
          setError(null);
          setSearchResult(result.user);        
        }
        else{
          setSearchResult(null);
          setError(result.message);       
        }
      }
      catch{
        setSearchResult(null);
        setError('There was problem with your request');
      }
    }
  }
  // console.log(searchResult);
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
    <div className='flex justify-center mt-5'>
        {
          error && <div className='mb-4'>
            <span className='text-red-500 text-lg sm:text-xl'>
              {error}
            </span>
          </div>
        }
    </div>
    <SearchItem searchResult={searchResult}/>
    </>
  );
}

export default Search;
