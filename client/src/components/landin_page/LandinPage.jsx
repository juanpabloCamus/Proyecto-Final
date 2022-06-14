import React from 'react'
import { Auth } from '../auth/Auth'
import { useDispatch } from 'react-redux'
import Acordion from './Acordion'
import { modalActions } from '../../redux/modal_slice/modalSlice'
import './landing_page.css'
import image from '../../assets/landing_image.png'
import rocket from '../../assets/rocket.png'


export const LandinPage = () => {

  window.scrollTo(0,0)

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
        <div className="landing__page_first_section animate__animated animate__fadeInUp">
          <h2><span className='span_1'>Rocket</span>, a bridge to connect <span className='span_2'>developers</span> and <span className='span_3'>companies</span> around the world.</h2>
          <div className='landing__page_first_section_text'>
            <p>Apply to several job offers made them by the best companies and startups</p>
            <p>Get interviewed directly with the hiring recruiters</p>
            <p>Get hired quickly through our notification system</p>
          </div>
          <div className='rocket_image'>
            <img src={rocket} alt="" />
          </div>
        </div>
        <Acordion></Acordion>
    </div>
  )
}
