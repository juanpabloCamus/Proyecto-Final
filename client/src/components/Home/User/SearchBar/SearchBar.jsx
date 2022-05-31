import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { jobsSearchBar } from "../../../../redux/jobs/jobsSearchBar";
import { GoSearch } from 'react-icons/go'


import style from "./SearchBar.module.css"


function SearchBar() {
  const [tech, setTech] = useState("");

  const dispatch = useDispatch();

    const handleChange = (e) => {
      e.preventDefault();
      setTech(e.target.value);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(jobsSearchBar(tech==='C+'?'Cplus':tech==='C++'?'Cplusplus':tech==='C#'?'CSharp':tech))
    };
    return (
          <div className={style.searchBar}>
            <input
            className={style.searchTerm}
              onChange={(e)=> handleChange(e)}        
              type="search"
              placeholder="Search technology.."
            />
          
              <button
              className={style.BtnSearch}
              onClick={(e) => handleSubmit(e)}
                type="submit"
              >
                <GoSearch />
              </button>
            
          </div>
      );

  
  
}

export default SearchBar;
