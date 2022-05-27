import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import style from "./NavBar.module.css";

function NavBarUsers() {
  return (
    <div>
           <div className={style.container}>
      <nav className={style.nav}>
       <SearchBar/>
          <p  className={style.link}>
            logo
          </p>
           <p>
             Mensaje
           </p>
          <p className={style.link}>
            Perfi
           </p>

      
      </nav>
    
    </div></div>
  )
}

export default NavBarUsers