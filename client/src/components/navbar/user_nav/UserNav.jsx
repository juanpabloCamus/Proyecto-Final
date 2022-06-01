import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import profile_image from '../../../assets/profile_img.jpg'
import { authActions } from '../../../redux/auth/authSlice'
import styles from './userNav.module.css'
import {BiHome} from "react-icons/bi"
export const UserNav = ({id}) => {

  const [ toggleMenu, setToggleMenu ] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const sessionStorage = JSON.parse(localStorage.getItem("userData"))
  const profile = sessionStorage.profileType.join(" ")


  const handleMenu = () => {
    setToggleMenu(!toggleMenu)
  }
  const handleLogout = () => {
    localStorage.removeItem("userData")
    dispatch(authActions.getNewUser({}))
    navigate("/")
    setToggleMenu(!toggleMenu)
  }
  
  
  return (
    <div className={ styles.logged_user_navbar }>
        <Link to={
          profile === "develop" ? "/home" : profile === "company" ? "/company" : "/admin"
        } className={ styles.return_home_link }>
          <BiHome/>
        </Link>
        <div onClick={ handleMenu } className={ styles.logged_user_icon } title={sessionStorage?.fullName || sessionStorage?.name}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg" alt="profile img" />
        </div>
        <div className={`${toggleMenu && styles.active} ${styles.logged_user_menu}`}>
            {
              <Link className={styles.link} to={
              profile === "develop" ? `/home/profile/${sessionStorage.id}` : profile === "company" ? `/company/profile/${sessionStorage.id}` : "/admin"
              }>
              Profile
              </Link>
            }
            <span className={styles.option} onClick={ handleLogout }>Logout</span>
        </div>
    </div>
  )
}
