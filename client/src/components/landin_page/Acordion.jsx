import React   from 'react'
import './Acordeon.css'

export default function Acordion () {
  return (
    
<div class="body">
 
  <div class="box">
    <div class="box-item">
        <p class="title">¿Quienes somos?</p>
        <ul class="box-item-content">
            <li>Somos el exito papi</li>
        </ul>
    </div>
    <div class="box-item">
        <p class="title">¿Que hacemos?</p>
        <ul class="box-item-content">
            <li>Servicios ágiles, con personalidad y marcado estilo propio.</li>
        </ul>
    </div>
    <div  class="box-item ">
        <p class="title">Saber más</p>
        <ul class="box-item-content">
            <li>www.Rocket.com.ar</li>
       
        </ul>
    </div>
    <div class="box-item">
        <p class="title">Contactanos</p>
        <ul class="box-item-content">
            <li>rocket@rocket.com.ar</li>
        </ul>
    </div>
    <div class="box-item">
        <p class="title">¿Por qué crees que te pusieron tu nombre?</p>
        <ul class="box-item-content">
            <li>No lo se...tu dimelo</li>
        </ul>
    </div>
    <div class="box-item">
        <p class="title">¿Querés plata?</p>
        <ul class="box-item-content">
            <li>Nosotros también</li>
        </ul>
    </div>
</div>
  
  
 
</div>
    );
};