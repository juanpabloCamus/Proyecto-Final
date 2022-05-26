import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Home from '../components/Home/Home'


export const AppRouter = () => {
  return (
    <div>
   
          <Routes>
            <Route path='/'element={<Home/>} /> 

        </Routes>
          
  
    </div>
            /*Como hacer para que la ruta sea users*/
  )
}
