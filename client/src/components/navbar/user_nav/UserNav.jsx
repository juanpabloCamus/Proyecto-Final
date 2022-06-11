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

export const UserNav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionStorage = JSON.parse(localStorage.getItem("userData"));
  const profile = sessionStorage.profileType[0];
  ///////////
  const id = sessionStorage.id;
  useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(fetchCompanyProfile(id));
    dispatch(fetchJobs());
  }, [dispatch, id]);
  const user = useSelector((state) => state.users.user);
  const companyProfile = useSelector(
    (state) => state.companyProfile.companyProfile[0]
  );



  //////////
  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("radio1");
    localStorage.removeItem("radio");
    dispatch(authActions.getNewUser({}));
    navigate("/");
    setToggleMenu(!toggleMenu);
  };

  const handleNotify = () => {
    console.log(profile)
    if(profile==='develop'){
      navigate("/home/notifications")
    }else{
      navigate("/company/notifications")
    }
  };

  return (
    <div className={styles.logged_user_navbar}>
      <div className={styles.logged_user_links}>
        <div>
          <div
            onClick={handleNotify}
            className={styles.icon_bell}
            title={sessionStorage?.fullName || sessionStorage?.name}>
            <FiBell className={styles.bell} />
          </div>
          
        </div>

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
              cloudName="dhar2oawa"
              publicId={companyProfile?.logo}
            />
          ) : (
            <Image
              cloudName="dhar2oawa"
              publicId={user?.profile_pic}
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
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <span className={styles.option}>Profile</span>
            </Link>
          }
          {
            profile === "develop" ?
            <Link to={`/home/myapplications/${sessionStorage.id}`}><span className={styles.option}>Applications</span></Link> : null
          }
          <span className={styles.option} onClick={handleLogout}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};
