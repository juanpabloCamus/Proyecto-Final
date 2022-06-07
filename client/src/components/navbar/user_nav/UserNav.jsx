<<<<<<< HEAD
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import profile_image from '../../../assets/profile_img.jpg'
import { authActions } from '../../../redux/auth/authSlice'
import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
=======
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import profile_image from "../../../assets/profile_img.jpg";
import { authActions } from "../../../redux/auth/authSlice";
import { Image } from 'cloudinary-react';

import styles from "./userNav.module.css";
import { BiHome } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { fetchUser } from "../../../redux/users/users";
import { fetchCompany } from "../../../redux/company/company";
import { fetchCompanyProfile } from "../../../redux/Profile/profileData";
>>>>>>> 39e18f9aab06b61a088428884823c464af1b8bbd

export const UserNav = () => {
  
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionStorage = JSON.parse(localStorage.getItem("userData"));
  const profile = sessionStorage.profileType.join(" ");
  ///////////
  const id = sessionStorage.id
  useEffect(() => {
    dispatch(fetchUser(id))
    dispatch(fetchCompanyProfile(id))
  }, [dispatch, id]);
  const user = useSelector((state) => state.users.user[0]);
  const companyProfile = useSelector(state => state.companyProfile.companyProfile[0])
  //////////
  const handleMenu = () => {
    setToggleMenu(!toggleMenu)
  };
  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(authActions.getNewUser({}));
    navigate("/");
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className={styles.logged_user_navbar}>
      <div className={styles.logged_user_links}>
<<<<<<< HEAD
          {/* <Link to="/notifications" className={styles.link}>
              <FiBell className={styles.bell}/>
          </Link> */}

            <MagicBell apiKey="aa64c7e916793f3432a40fd41ff5451f57d3e844" userEmail={sessionStorage.email}>
              {(props) => <FloatingNotificationInbox height={500} {...props} />}
            </MagicBell>
       
          {profile === "develop" && <Link to="/home/favorites"  className={styles.link}>
              <FiHeart className={styles.heart}/>
          </Link>}
          
          <Link to={
            profile === "develop" ? "/home" : profile === "company" ? "/company" : "/admin"
          }  className={styles.link}>
              <BiHome className={styles.home}/>
=======
        <Link to="/notifications" className={styles.link}>
          <FiBell className={styles.bell} />
        </Link>

        {profile === "develop" && (
          <Link to="/home/favorites" className={styles.link}>
            <FiHeart className={styles.heart} />
>>>>>>> 39e18f9aab06b61a088428884823c464af1b8bbd
          </Link>
        )}

        <Link
          to={
            profile === "develop"
              ? "/home"
              : profile === "company"
              ? "/company"
              : "/admin"
          }
          className={styles.link}
        >
          <BiHome className={styles.home} />
        </Link>
      </div>
      <div>
        <div
          onClick={handleMenu}
          className={styles.logged_user_icon}
          title={sessionStorage?.fullName || sessionStorage?.name}
        >
          {sessionStorage.profileType == "company" ? (
            // <img src={sessionStorage.logo} alt="profile img" />
            <Image
              cloudName="dhar2oawa"
              publicId={companyProfile?.logo}
              id={styles.banner}
              //width="100"
              //crop="scale"
            />
          ) : (
            // <img src={sessionStorage.profile_pic} alt="profile img" />
            <Image
              cloudName="dhar2oawa"
              publicId={user?.profile_pic}
              id={styles.banner}
              //width="100"
              //crop="scale"
            />
          )}
        </div>
        <div
          className={`${toggleMenu && styles.active} ${
            styles.logged_user_menu
          }`}
        >
          {
            <Link
              to={
                profile === "develop"
                  ? `/home/profile/${sessionStorage.id}`
                  : profile === "company"
                  ? `/company/profile/${sessionStorage.id}`
                  : "/admin"
              }
            >
              <span className={styles.option}>Profile</span>
            </Link>
          }
          <span className={styles.option} onClick={handleLogout}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};
