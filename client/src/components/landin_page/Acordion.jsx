import React   from 'react'
import './Acordeon.css'

export default function Acordion () {
  return (
    
<div className="body">
 
  <div className="box">
    <div className="box-item">
        <p className="title">About us</p>
        <ul className="box-item-content">
            <li>We are Henry Students</li>
        </ul>
    </div>
    <div className="box-item">
        <p className="title">What do we do?</p>
        <ul className="box-item-content">
            <li>We will help you to obatin your dream job</li>
        </ul>
    </div>
    <div  className="box-item ">
        <p className="title">Know more</p>
        <ul className="box-item-content">
            <li>www.Rocket.com.ar</li>
       
        </ul>
    </div>
    <div className="box-item">
        <p className="title">Contact us</p>
        <ul className="box-item-content">
            <li>rocket@rocket.com.ar</li>
        </ul>
    </div>
    <div className="box-item">
        <p className="title">¿Por qué crees que te pusieron tu nombre?</p>
        <ul className="box-item-content">
            <li>No lo se...tu dimelo</li>
        </ul>
    </div>
    <div className="box-item">
        <p className="title">¿Querés plata?</p>
        <ul className="box-item-content">
            <li>Nosotros también</li>
        </ul>
    </div>
</div>
    
  
 
</div>
    );
};