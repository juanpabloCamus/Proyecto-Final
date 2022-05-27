import React from 'react'
import {useState} from "react";
import {useDispatch} from "react-redux"



function SearchBar() {
    
    const dispatch=useDispatch();
 
    return (
        <div >
          <div >
            <input
                      
              type="text"
              placeholder="Buscar...."
            />
            <button
    
             
              type="submit"
            >
            
             Buscar
            </button>
          </div>
        </div>
      );

   
}

export default SearchBar