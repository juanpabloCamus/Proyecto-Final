import React from 'react'
import { Auth } from '../auth/Auth'
import { Navbar } from '../navbar/Navbar'


import './landing_page.css'
import image from '../../assets/landing_image.png'

export const LandinPage = () => {
  return (
    <div>
        <Navbar/>
        <Auth/>
        <div className="landing__page-container">
          <div className="landing__page-text">
            <h4>Search, apply and get hired.</h4>
            <h1>Find your <span>dream</span> job.</h1>
            <button className="landing__page-button">Join now!</button>
          </div>

          <div className="landing__page-image">
            <img src={image} alt="" />
          </div>
        </div>
    </div>
  )
}
