import { createContext, useState } from "react";
const SearchQuery= new createContext();
const SearchQueryProvider=({children})=>{
    const [query,SetQuery]=useState('check');
    const [active,SetActive]= useState('');
    return(
    <SearchQuery.Provider value={{query,SetQuery,active,SetActive}}>
        {children}
    </SearchQuery.Provider>
    );
};
export {SearchQuery,SearchQueryProvider}