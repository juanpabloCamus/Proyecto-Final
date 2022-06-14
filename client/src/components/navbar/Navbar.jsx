import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { modalActions } from "../../redux/modal_slice/modalSlice";
import { UserNav } from "./user_nav/UserNav";


import "./navbar.css";

export const Navbar = () => {
  const dispatch = useDispatch();

  const sessionStorage = JSON.parse(localStorage.getItem("userData"));

  const handleOpenLoginModal = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateLoginModal(true));
  };

  const handleOpenRegisterModal = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateRegisterModal(true));
    dispatch(modalActions.activateLoginModal(false));
  };

  const scroll0 = (e)=>{
    e.preventDefault()
    window.scrollTo(0,0)
  }

  return (
    <nav className="nav animate__animated animate__fadeInDownBig">
      <Link to="/" onClick={scroll0()}>
        <div className="logo">
          <span>Rocket</span>
        </div>
      </Link>
      <div>
        
      </div>
     <ul className="navbar">
        {sessionStorage ? (
           
          sessionStorage.profileType[0] === "develop" ? (
              <UserNav />
          ) : (
              <UserNav />

          )
        )
       : (
          <>
            <li>
              <button
                onClick={handleOpenLoginModal}
                className="navbar_button login"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={handleOpenRegisterModal}
                className="navbar_button register"
              >
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
