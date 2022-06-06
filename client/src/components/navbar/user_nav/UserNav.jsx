import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link, useSearchParams } from 'react-router-dom'
import profile_image from '../../../assets/profile_img.jpg'
import { authActions } from '../../../redux/auth/authSlice'
import { fetchUser } from "../../../redux/users/users";



import styles from './userNav.module.css'
import {BiHome} from "react-icons/bi"
import {FiHeart} from "react-icons/fi"
import {FiBell} from "react-icons/fi"
import { fetchCompany } from '../../../redux/company/company'



export const UserNav = ({id}) => {

  const [ toggleMenu, setToggleMenu ] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const sessionStorage = JSON.parse(localStorage.getItem("userData"))
  const profile = sessionStorage.profileType.join(" ")
  useEffect(()=>
  {
    dispatch(fetchUser(sessionStorage.id))
    dispatch(fetchCompany(sessionStorage.id))
  },[dispatch])
  const handleMenu = () => {
    
    setToggleMenu(!toggleMenu)
  }
  const handleLogout = () => {
    localStorage.removeItem("userData")
  
    dispatch(authActions.getNewUser({}))
    navigate("/")
    setToggleMenu(!toggleMenu)
  }
  const company=useSelector(state=>state.company.company)
  const user=useSelector(state=>state.users.users)

  
  return (
    <div className={ styles.logged_user_navbar }>
      <div className={styles.logged_user_links}>
          <Link to="/notifications" className={styles.link}>
              <FiBell className={styles.bell}/>
          </Link>
       
          {profile === "develop" && <Link to="/home/favorites"  className={styles.link}>
              <FiHeart className={styles.heart}/>
          </Link>}
          
          <Link to={
            profile === "develop" ? "/home" : profile === "company" ? "/company" : "/admin"
          }  className={styles.link}>
              <BiHome className={styles.home}/>
          </Link>
      </div>
      <div>
      <div onClick={ handleMenu } className={ styles.logged_user_icon } title={sessionStorage?.fullName || sessionStorage?.name}>
          {sessionStorage.profileType=="company" ? <img src={company.logo}alt="profile img" />:<img src={user[0].profile_pic} alt="profile img"  /> } 
        </div>
        <div className={`${toggleMenu && styles.active} ${styles.logged_user_menu}`}>
            {
              <Link to={
              profile === "develop" ? `/home/profile/${sessionStorage.id}` : profile === "company" ? `/company/profile/${sessionStorage.id}` : "/admin"
              }>
                <span className={styles.option}>
                  Profile
                </span>
              </Link>
            }
            <span className={styles.option} onClick={ handleLogout }>Logout</span>
        </div>
      </div>
        
    </div>
  )
}
