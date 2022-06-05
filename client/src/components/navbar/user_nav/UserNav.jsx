import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import profile_image from "../../../assets/profile_img.jpg";
import { authActions } from "../../../redux/auth/authSlice";
import Notifications from "react-notifications-menu";

import styles from "./userNav.module.css";
import { BiHome } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { FiBell } from "react-icons/fi";

const DEFAULT_NOTIFICATION = {
  image:
    "https://www.insights.la/wp-content/uploads/2015/04/Microsoft-logo-m-box-880x660.png",
  message: "Microsoft create a new job offer.",
  detailPage: "/events",
  receivedTime: "1h ago"
};

export const UserNav = ({ id }) => {
  const iconBell = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iYXBwLWljb24gIiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7Ij48cGF0aCBkPSJNMzA3LjIgNDA5LjZ2MzU4LjRoNDA5LjZ2LTM1OC40YzAtMTEzLjEwOC05MS42OTItMjA0LjgtMjA0LjgtMjA0LjhzLTIwNC44IDkxLjY5Mi0yMDQuOCAyMDQuOHYwek00MTEuMTM2IDExOS4yOTZjLTAuODE1LTQuODUyLTEuMjgtMTAuNDQyLTEuMjgtMTYuMTQgMC01Ni41NTQgNDUuODQ2LTEwMi40IDEwMi40LTEwMi40czEwMi40IDQ1Ljg0NiAxMDIuNCAxMDIuNGMwIDUuNjk5LTAuNDY1IDExLjI4OC0xLjM2MSAxNi43MzRsMC4wODEtMC41OTNjMTIwLjg3NSA0My4xNTYgMjA1LjgyNCAxNTYuNjUzIDIwNS44MjQgMjg5Ljk5MSAwIDAuMTEtMCAwLjIyLTAgMC4zM2wwLTAuMDE3djMwNy4ybDE1My42IDEwMi40djUxLjJoLTkyMS42di01MS4ybDE1My42LTEwMi40di0zMDcuMmMtMC0wLjA0MC0wLTAuMDg3LTAtMC4xMzUgMC0xMzMuNTI4IDg1LjE5My0yNDcuMTU5IDIwNC4xODktMjg5LjUwM2wyLjE0Ny0wLjY2NnpNNjE0LjQgOTIxLjZjMCA1Ni41NTQtNDUuODQ2IDEwMi40LTEwMi40IDEwMi40cy0xMDIuNC00NS44NDYtMTAyLjQtMTAyLjR2MGgyMDQuOHoiIHN0eWxlPSJmaWxsOiByZ2IoMTU3LCAxNTcsIDE1Nyk7Ij48L3BhdGg+PC9zdmc+"

  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  
  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [message, setMessage] = useState("");
  //
  const sessionStorage = JSON.parse(localStorage.getItem("userData"));
  const profile = sessionStorage.profileType.join(" ");

  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(authActions.getNewUser({}));
    navigate("/");
    setToggleMenu(!toggleMenu);
  };

  const onClick = () => {
    if (message.length > 0) {
      setData([
        ...data,
        {
          ...DEFAULT_NOTIFICATION,
          message
        }
      ]);
      setMessage("");
      alert("notification added");
    }
  };

  return (
    <div className={styles.logged_user_navbar}>
      <div className={styles.logged_user_links}>
        <div className={styles.div}>

        {/* <Link to="/notifications" className={styles.link}> */}
          {/* <FiBell className={styles.bell} /> */}
          <Notifications
            
            data={data}
            header={{
              title: "Notifications",
              option: {
                text: "View All",
                onClick: () => console.log("Clicked"),
              },
            }}
            markAsRead={(data) => {
              console.log(data);
            }}
            icon={iconBell}
            classNamePrefix=''
            className={styles.class}
          />
        {/* </Link> */}
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
            <img src={sessionStorage.logo} alt="profile img" />
          ) : (
            <img src={sessionStorage.profile_pic} alt="profile img" />
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
