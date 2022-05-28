import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import profile_image from '../../../assets/profile_img.jpg'
import styles from './userNav.module.css'

export const UserNav = () => {

const [ toggleMenu, setToggleMenu ] = useState(false)
const {loggedUser} = useSelector(state => state.auth)


  const handleMenu = () => {
    setToggleMenu(!toggleMenu)
  }
  
  return (
    <div className={ styles.logged_user_navbar }>
        <div onClick={ handleMenu } className={ styles.logged_user_icon }>
            <img src={ profile_image } alt="profile img" title={loggedUser.fullName}/>
        </div>
        <div className={`${toggleMenu && styles.active} ${styles.logged_user_menu}`}>
            <span>Go to profile</span>
            <span>Logout</span>
        </div>
    </div>
  )
}
