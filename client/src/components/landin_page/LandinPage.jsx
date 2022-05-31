import React from 'react'
import { Auth } from '../auth/Auth'
import { useDispatch } from 'react-redux'
import Acordion from './Acordion'


import { modalActions } from '../../redux/modal_slice/modalSlice'

import './landing_page.css'
import image from '../../assets/landing_image.png'

export const LandinPage = () => {


const dispatch = useDispatch()

const handleOpenModal = () =>{
  dispatch(modalActions.setModalValue())
  dispatch(modalActions.activateRegisterModal(true))
}


  return (
    <div>
        <Auth/>
        <div className="landing__page-container">
          <div className="landing__page-text animate__animated animate__fadeInUp">
            <h4>Search, apply and get hired.</h4>
            <h1>Find your <span>dream</span> job.</h1>
            <button  onClick={ handleOpenModal } className="landing__page-button">Join now!</button>
          </div>

          <div className="landing__page-image animate__animated animate__fadeInUp">
            <img src={image} alt="" />
          </div>
        </div>
        <Acordion></Acordion>
    </div>
  )
}
