import React from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { modalActions } from "../../redux/modal_slice/modalSlice";
import SearchBar from "../Home/User/SearchBar/SearchBar";
import CompanyNav from "./company_nav/CompanyNav";
import "./navbar.css";
import { UserNav } from "./user_nav/UserNav";

export const Navbar = () => {
  const dispatch = useDispatch();

  //Cambiar cuando este lista la autenticacion

  let ubicacion = window.location.pathname;
  const userLocalStorage=JSON.parse(localStorage.getItem("user"))


  const handleOpenLoginModal = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateLoginModal(true));
  };

  const handleOpenRegisterModal = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateRegisterModal(true));
  };

  return (
    <nav className="nav animate__animated animate__fadeInDownBig">
      {ubicacion === "/" ? (
        <Link to="/">
          <div className="logo">
            <span>Rocket</span>
          </div>
        </Link>
      ) : (
        <Link to="/home">
          <div className="logo">
            <span>Rocket</span>
          </div>
        </Link>
      )}
      {ubicacion === "/" ? (
        <ul className="navbar">
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
        </ul>
      ) : (
        <>
                 {userLocalStorage.profileType === "develop" ? (
            <>
              <div className="searchBar">
               
              </div>
              <div className="profileDiv">
                <UserNav />
              </div>
            </>
          ) : (
            <>
      
              <div>
                <Link to="/company/createjob">
                  <div className="buttonJob">
                    <span>Create new job</span>
                  </div>
                </Link>
              </div>
              <div>
                <UserNav/>
              </div>
            </>
          )}
        </>
      )}
    </nav>
  );
};

//  <Link to="/home/createjob">
//                     <div className="buttonJob">
//                         <span>Create new job</span>
//                     </div>
//                 </Link>
