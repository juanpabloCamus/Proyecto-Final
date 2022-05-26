import React from 'react'
import { useDispatch } from 'react-redux'

import { modalActions } from '../../redux/modal_slice/modalSlice'

import './navbar.css'

export const Navbar = () => {

const dispatch = useDispatch()

    const handleOpenLoginModal = ()  =>{
        dispatch(modalActions.setModalValue())
        dispatch(modalActions.activateLoginModal(true))
      }
    
    
      const handleOpenRegisterModal = ()  =>{
        dispatch(modalActions.setModalValue())
        dispatch(modalActions.activateRegisterModal(true))
      }



  return (
    <nav className='nav'>
        <div className="logo">
            <span>Rocket</span>
        </div>
        <ul className="navbar">
            <li>
                <button
                    onClick={ handleOpenLoginModal }
                    className="navbar_button login"
                >Login</button>
            </li>
            <li>
                <button
                    onClick={ handleOpenRegisterModal }
                    className="navbar_button register"
                >Sign Up</button>
            </li>
        </ul>
    </nav>
  )
}

