import React   from 'react'
import './Acordeon.css'

export default function Acordion () {
  return (
    
<div className="body">
 
  <div className="box">
    <div className="box-item">
        <p className="title">¿Quienes somos?</p>
        <ul className="box-item-content">
            <li>Somos el exito papi</li>
        </ul>
    </div>
    <div className="box-item">
        <p className="title">¿Que hacemos?</p>
        <ul className="box-item-content">
            <li>Servicios ágiles, con personalidad y marcado estilo propio.</li>
        </ul>
    </div>
    <div  className="box-item ">
        <p className="title">Saber más</p>
        <ul className="box-item-content">
            <li>www.Rocket.com.ar</li>
       
        </ul>
    </div>
    <div className="box-item">
        <p className="title">Contactanos</p>
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