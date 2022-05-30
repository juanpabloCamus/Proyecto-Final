import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import profile_image from '../../../assets/profile_img.jpg'
import styles from './userNav.module.css'

export const UserNav = () => {

  const [ toggleMenu, setToggleMenu ] = useState(false)

  const handleMenu = () => {
    setToggleMenu(!toggleMenu)
  }
  
  return (
    <div className={ styles.logged_user_navbar }>
                <div onClick={ handleMenu } className={ styles.logged_user_icon }>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg" alt="profile img" />
        </div>
        <div className={`${toggleMenu && styles.active} ${styles.logged_user_menu}`}>
            <span className={styles.option}>Go to profile</span>
            <span className={styles.option}><Link to='/'>Logout</Link></span>
        </div>
    </div>
  )
}
