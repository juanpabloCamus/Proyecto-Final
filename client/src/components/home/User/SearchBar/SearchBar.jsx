import React from 'react'
import {useState} from "react";
import {useDispatch} from "react-redux"

import style from "./SearchBar.module.css";


function SearchBar() {
    
    const dispatch=useDispatch();
 
    return (
        <div className={style.containerS}>
        <div className={style.SearchBar}>
          <input
            className={style.searchTerm}
           
            type="text"
            placeholder="Buscar...."
          />
          <button
            className={style.BtnSearch}
         
            type="submit"
          >
          
           Buscar
          </button>
        </div>
      </div>
      );

   
}

export default SearchBar