import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import profile_image from "../../../assets/profile_img.jpg";
import { authActions } from "../../../redux/auth/authSlice";
import { Image } from "cloudinary-react";

import styles from "./userNav.module.css";
import { BiHome } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { fetchUser } from "../../../redux/users/users";
import { fetchCompany } from "../../../redux/company/company";
import { fetchCompanyProfile } from "../../../redux/Profile/profileData";
import { fetchJobs } from "../../../redux/jobs/jobs";
import NotificationsBell from "./NotificationsBell";

export const UserNav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMenu2, setToggleMenu2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionStorage = JSON.parse(localStorage.getItem("userData"));
  const profile = sessionStorage.profileType.join(" ");
  ///////////
  const id = sessionStorage.id;
  useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(fetchCompanyProfile(id));
    dispatch(fetchJobs());
  }, [dispatch, id]);
  const user = useSelector((state) => state.users.user[0]);
  const companyProfile = useSelector(
    (state) => state.companyProfile.companyProfile[0]
  );

  const jobs = useSelector((state) => state.jobs.jobs);
  console.log(jobs ? jobs[0]?.offers : null);

  //////////
  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  const handleMenu2 = () => {
    setToggleMenu2(!toggleMenu2);
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
            onClick={handleMenu2}
            className={styles.icon_bell}
            title={sessionStorage?.fullName || sessionStorage?.name}
          >
            {/* <Link to="/notifications" className={styles.link}> */}
            <FiBell className={styles.bell} />
            {/* </Link> */}
          </div>
          <div
            className={`${toggleMenu2 && styles.active} ${
              styles.contenedor_notifies
            }`}
          >
            <div className={styles.headNoti}>
              <div><b>Notifications</b></div>
              <div className={styles.div_dir} onClick={handleNotify}>
                See more
              </div>
            </div>
            {jobs ? (
              jobs[0]?.offers?.map((e) => {
                return (
                  <span key={e.id} className={styles.option}>
                    <NotificationsBell
                      id={e.id}
                      logo={e.company_accounts[0].logo}
                      name={e.company_accounts[0].name}
                      offer={e.position}
                    ></NotificationsBell>
                  </span>
                );
              })
            ) : (
              <></>
            )}
            <div className={styles.linea}></div>
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
          title={sessionStorage?.fullName || sessionStorage?.name}
        >
          {sessionStorage.profileType == "company" ? (
            // <img src={sessionStorage.logo} alt="profile img" />
            <Image
              cloudName="dhar2oawa"
              publicId={companyProfile?.logo}
              //id={styles.banner}
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
