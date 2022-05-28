import React from 'react'
import {useState} from "react";
import {useDispatch} from "react-redux"
import { jobsSearchBar } from "../../../../redux/jobs/jobsSearchBar";


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
          <div >
            <input
              onChange={(e)=> handleChange(e)}        
              type="text"
              placeholder="Buscar...."
            />
            <button
    
             onClick={(e) => handleSubmit(e)}
              type="submit"
            >
            
             Buscar tecnologia
            </button>
          </div>
        </div>
      );

   
}

export default SearchBar