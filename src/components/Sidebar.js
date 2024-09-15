import React, { useContext, useEffect, useState } from 'react'
import { SearchQuery } from '../context/SearchQuery';

function Sidebar() {
    let {active,SetActive}= useContext(SearchQuery);
    const handleActive=(item)=>{
        SetActive(item)
    }
    const [data,setData]=useState([]);
  let [page]=useState(1);
  let {query}=useContext(SearchQuery);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json, text/plain, */*");
    myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("origin", "http://localhost:3001");
    myHeaders.append("referer", "http://localhost:3001/");
    myHeaders.append("user-agent", "Mozilla/5.0");

    const raw = JSON.stringify({
      "input_query": query,
      "input_query_type": "",
      "sort_by": "default",
      "status": [],
      "exact_match": false,
      "date_query": false,
      "owners": [],
      "attorneys": [],
      "law_firms": [],
      "mark_description_description": [],
      "classes": [],
      "page": page,
      "rows": 10,
      "sort_order": "desc",
      "states": [],
      "counties": []
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://vit-tm-task.api.trademarkia.app/api/v3/us", requestOptions)
      .then(response => response.json())
      .then((result) => {
        const hits = result.body.hits.hits;
        setData(hits);
      })
      .catch(error => console.error('Error:', error));
      console.log(page,query)
  }, [page,query]);
    document.querySelectorAll('.tab').forEach(tab => {  
        tab.addEventListener('click', () => {    
         document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));  
         tab.classList.add('active');  
        });  
      });  
        
      
      document.querySelectorAll('.company-list input[type="checkbox"]').forEach(checkbox => {  
        checkbox.addEventListener('change', () => {  
         checkbox.nextElementSibling.classList.toggle('checked');  
        });  
      });  
        
      
      document.querySelectorAll('.display-options button').forEach(button => {  
        button.addEventListener('click', () => {  
         document.querySelectorAll('.display-options button').forEach(b => b.classList.remove('active'));  
         button.classList.add('active');  
        });  
      });
  return (
    <div>
      <div className="sidebar-contain">
        <div className="status">
        <div className="toolbar">  
  <div className="filter-button">  
   <span>Filter</span>  
   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" id="filter">
  <g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
    <g stroke="#000" stroke-width="2" transform="translate(-1614 -1629)">
      <g transform="translate(1615 1630)">
        <path d="M20 0H0l8 9.46V16l4 2V9.46z"></path>
      </g>
    </g>
  </g>
</svg>  
  </div>  
  <button className="nav-button">  
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" id="share">
  <g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="translate(1 1)">
    <circle cx="15" cy="3" r="3"></circle>
    <circle cx="3" cy="10" r="3"></circle>
    <circle cx="15" cy="17" r="3"></circle>
    <path d="m5.59 11.51 6.83 3.98M12.41 4.51 5.59 8.49"></path>
  </g>
</svg> 
  </button>  
  <button className="menu-button">  
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="list">
  <g fill="none">
    <path d="M0 0h24v24H0V0z"></path>
    <path d="M0 0h24v24H0V0z" opacity=".87"></path>
  </g>
  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7zm-4 6h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path>
</svg>
  </button>  
</div>
            <h4>Status</h4>
            <div className="status-content">
                <ul>
                    <li className={active===''?'active':''} onClick={()=>handleActive('')}>All</li>
                    <li className={active==='registered'?'active':''} onClick={()=>handleActive('registered')}><div id='green-dot'></div>Registered</li>
                    <li className={active==='pending'?'active':''} onClick={()=>handleActive('pending')}><div id="yellow-dot"></div> Pending</li>
                    <li className={active==='abandoned'?'active':''} onClick={()=>handleActive('abandoned')}><div id="red-dot"></div> Abandoned</li>
                    <li className={active==='others'?'active':''} onClick={()=>handleActive('others')}><div id="blue-dot"></div> Others</li>
                </ul>
            </div>
        </div>
        <div className="container">  
  <header>  
  <button className="tab active">Owners</button>  
  <button className="tab">Law Firms</button>  
  <button className="tab">Attorneys</button>  
  </header>  
  <div className="search-bar">  
  <input type="search" placeholder="Search Owners"/>  
  <i className="fa fa-search"></i>  
  </div>  
  {data.slice(0,5).map((item)=>(
  <ul className="company-list">  
  <li>  
 <input type="checkbox" id="tesla"/>  
 <label htmlFor="tesla">{item._source.current_owner}</label>  
  </li>   
  </ul>  
  ))}
  <div className="display-options">  
  <button className="grid-view active">Grid View</button>  
  <button className="list-view">List View</button>  
  </div>  
</div>

      </div>
    </div>
  )
}

export default Sidebar
