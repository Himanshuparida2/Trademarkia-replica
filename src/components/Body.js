import React, { act, useContext, useEffect, useState } from 'react'
import { SearchQuery } from '../context/SearchQuery';

function Body(props) {
  const [data,setData]=useState([]);
  let [page,setPage]=useState(1);
  let {query,SetQuery}=useContext(SearchQuery);
  let {active,SetActive}=useContext(SearchQuery);
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
  return (
    <div>
      <div className="body-contain">
        <h3>About {props.totalquery} Trademarks found for "{props.query}"</h3>
        <div className="result-content">
        <h4>Also try searching for </h4> <h4 id='tag' onClick={(e)=>{SetQuery(query+' ')}}>{query}*</h4> <h4 id='tag'>*{(query)}</h4>
        </div>
        <div className="list">
          <div className="list-heading">
            <h4>Mark</h4>
            <h4>Details</h4>
            <h4>Status</h4>
            <h4>Class/Description</h4>
          </div>
          <div className="list-content">
            {data.filter(num=>{if(active=''){return true;} return num._source.status_type==active}).map((item)=>(
            <ul key={item._id}>
              <li><img src="https://www.strunkmedia.com/wp-content/uploads/2018/05/bigstock-221516158.jpg" id='company-logo' alt="" /></li>
              <li><h5>{item._source.mark_identification.substring(0,50)}</h5> <h5>{((item._source.current_owner).substring(0,50))}</h5><h5>{item._id}</h5><h5>{new Date(item._source.registration_date).toLocaleString('en-US',{ date:'numeric',year: 'numeric',month:'long'})}</h5></li>
              <li><h4>{item._source.status_type}</h4><p>on {new Date(item._source.renewal_date).toLocaleString('en-US',{date:'numerical',month:'long',year:'numeric'})}</p></li>
              <li><p>{item._source.mark_description_description.join().substring(0,100)+'...'}</p></li>
            </ul>
            ))}
          </div>
        </div>
       <div className="bottom-content">
       <button id='prev'onClick={()=>{setPage(Math.max(page-1,1)); window.scrollTo({top:0, behavior:'smooth'})}}>Prev</button><h4 id='pageno'>{page}</h4><button id='next' onClick={()=>{setPage(page+1); window.scrollTo({top:0, behavior:'smooth'})}}>Next</button>
       </div>
      </div>
    </div>
  )
}

export default Body
