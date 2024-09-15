import React, { useContext } from 'react'
import { SearchQuery } from '../context/SearchQuery';

function Sidebar() {
    let {active,SetActive}= useContext(SearchQuery);
    const handleActive=(item)=>{
        SetActive(item)
    }
  return (
    <div>
      <div className="sidebar-contain">
        <div className="status">
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
      </div>
    </div>
  )
}

export default Sidebar
