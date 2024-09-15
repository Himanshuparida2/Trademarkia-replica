import React, { useContext, useState } from 'react'
import logo from '../images/logo_trademarkia.webp'
import { SearchQuery } from '../context/SearchQuery';

function Topbar() {
  let {query,SetQuery}=useContext(SearchQuery);
  const[searchterm,SetSearchTerm]=useState('')
  function handleSearch(e){
    SetSearchTerm(e.target.value)
  }
  return (
    <div>
      <div className="topbar-contain">
        <img src={logo} alt="trademarkia-logo" id='trademarkia-logo'/>
        <input type="text" name='search' placeholder='Search Trademark Here eg. Mickey Mouse' id='search-bar' onChange={handleSearch}/>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" id="search">
  <g fill="none" fillRule="evenodd" stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" transform="translate(2 2)">
    <circle cx="9.767" cy="9.767" r="8.989"></circle>
    <line x1="16.018" x2="19.542" y1="16.485" y2="20"></line>
  </g>
</svg>
<button onClick={()=>{SetQuery(searchterm); console.log(query);}}>Search</button>
      </div>
    </div>
  )
}

export default Topbar;