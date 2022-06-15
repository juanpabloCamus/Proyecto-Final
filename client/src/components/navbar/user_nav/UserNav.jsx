import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { authActions } from "../../../redux/auth/authSlice";
import { Image } from "cloudinary-react";

import styles from "./userNav.module.css";
import { BiHome } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { fetchUser } from "../../../redux/users/users";
import { fetchCompanyProfile } from "../../../redux/Profile/profileData";
import { fetchJobs } from "../../../redux/jobs/jobs";
import { fetchNotifications } from "../../../redux/notifications/notifications";
import { fetchCompanyNotifications } from "../../../redux/notifications/companyNotifications";

export const UserNav = () => {

  const [toggleMenu, setToggleMenu] = useState(false);
  const [showNotiPoint, setShowNotiPoint] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionStorage = JSON.parse(localStorage.getItem("userData"));
  const profile = sessionStorage.profileType[0];

  const id = sessionStorage.id;

//////////  Notifications  ////////////
const {notifications} = useSelector( state => state.notifications)
const {companyNotifications} = useSelector( state => state.companyNotifications)


 
  useEffect(() => {
    if(profile === 'develop'){
      dispatch(fetchUser(id));
    dispatch(fetchNotifications(id))
    }
    if(profile === 'company'){
      dispatch(fetchCompanyProfile(id));
      dispatch(fetchCompanyNotifications(id))
    }
    dispatch(fetchJobs());

  }, [dispatch, id, profile]);

  const user = useSelector((state) => state.users?.user);
  const companyProfile = useSelector(
    (state) => state.companyProfile.companyProfile[0]
  );

  window.onclick = function(){
    setToggleMenu(false)
  }

  useEffect(() =>{
    
    if(notifications.length > 0 && profile === "develop") {
      
      const findTrueNoti = notifications.find(noti => noti.check === false)
    
      if(findTrueNoti){
        setShowNotiPoint(true)
      }

      if(notifications[0]?.check){
        setShowNotiPoint(false)
      }
    }

    if(companyNotifications.length > 0 && profile === "company") {
      
      const findTrueNoti = companyNotifications.find(noti => noti.check === false)

      if(findTrueNoti){
        setShowNotiPoint(true)
      }
      if(companyNotifications[0]?.check){
        setShowNotiPoint(false)
      }
    }

  },[notifications, companyNotifications, profile])



  const handleMenu = () => {
    setTimeout(()=>setToggleMenu(true),10)
  };

  
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("radio1");
    localStorage.removeItem("radio");
    dispatch(authActions.getNewUser({}));
    navigate("/");
    setToggleMenu(false);
  };

  const handleNotify = () => {
    if(profile==='develop'){
      navigate("/home/notifications")
    }else{
      navigate("/company/notifications")
    }
  };

  return (
    <div className={styles.logged_user_navbar}>
      <div className={styles.logged_user_links}>
        {profile !== 'admin' ? <div className={styles.bell_icon_container}>
          <div
            onClick={handleNotify}
            className={styles.icon_bell}
            title={sessionStorage?.fullName || sessionStorage?.name}>
            <FiBell className={styles.bell} />
            {
              showNotiPoint ? 
              <span className={styles.bell_point_notification}></span> 
              :
              null
            }
          </div>

        </div>:<></>}

        {profile === "develop" && (
          <Link to="/home/favorites" className={styles.link}>
            <FiHeart className={styles.heart} />
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
          title={sessionStorage?.fullName || sessionStorage?.name}>

          {sessionStorage.profileType[0] === "company" ? (
            <Image
              cloudName="dlt2bs82a"
              publicId={companyProfile?.logo}
            />
          ) : (
            <Image
              cloudName="dlt2bs82a"
              publicId={user[0]?.profile_pic}
              id={styles.banner}
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
              onClick={() => setToggleMenu(false)}
            >
              <span className={styles.option}>Profile</span>
            </Link>
          }
          {
            profile === "develop" ?
            <Link to={`/home/myapplications/${sessionStorage.id}` } onClick={() => setToggleMenu(false)}><span className={styles.option}>Applications</span></Link> : null
          }
          <span className={styles.option} onClick={handleLogout}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};
