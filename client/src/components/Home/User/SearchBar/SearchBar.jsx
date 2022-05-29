import React from 'react'
import {useState} from "react";
import {useDispatch} from "react-redux"
import { jobsSearchBar } from "../../../../redux/jobs/jobsSearchBar";
import style from './SearchBar.module.css'

function SearchBar() {

  const [tech, setTech] = useState("")
    
    const dispatch=useDispatch();

    const handleChange = (e) => {
      e.preventDefault();
      setTech(e.target.value);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(jobsSearchBar(tech))
    };
    return (
        <div >
          <div className={style.SearchBar}>
            <input
            className={style.searchTerm}
              onChange={(e)=> handleChange(e)}        
              type="text"
              placeholder="Buscar...."
            />
            <button
             className={style.BtnSearch}
             onClick={(e) => handleSubmit(e)}
             type="submit"
            >
            
             Buscar
            </button>
          </div>
        </div>
      );

   
}

export default SearchBar