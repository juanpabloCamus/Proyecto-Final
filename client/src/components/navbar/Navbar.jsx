import React from 'react'
import { useDispatch } from 'react-redux'

import { modalActions } from '../../redux/modal_slice/modalSlice'

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
    <nav>
        <div className="logo">
            <span>Logo</span>
        </div>
        <ul className="navbar">
            <li>
                <button
                    onClick={ handleOpenLoginModal }
                >Login</button>
            </li>
            <li>
                <button
                    onClick={ handleOpenRegisterModal }
                >Sign Up</button>
            </li>
        </ul>
    </nav>
  )
}

