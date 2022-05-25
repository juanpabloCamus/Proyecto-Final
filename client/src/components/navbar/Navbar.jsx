import { useAuth0 } from "@auth0/auth0-react";

import React from 'react'

import { useDispatch } from "react-redux";
import { authActions } from "../../redux/auth/authSlice";

export const Navbar = () => {

const { loginWithPopup } = useAuth0()
const dispatch = useDispatch()


const handleDeveloperLogin = () => {
    loginWithPopup()
    dispatch(authActions.setClientType('developer'))
}

const handleCompanyLogin = () => {
    loginWithPopup()
    dispatch(authActions.setClientType('company'))
}

  return (
    <nav>
        <div className="logo">
            <span>Logo</span>
        </div>
        <ul className="navbar">
            <li>
                <button
                    onClick={ handleDeveloperLogin } 
                >Developers</button>
            </li>
            <li>
                <button
                    onClick={ handleCompanyLogin } 
                >Companies</button>
            </li>
        </ul>
    </nav>
  )
}

