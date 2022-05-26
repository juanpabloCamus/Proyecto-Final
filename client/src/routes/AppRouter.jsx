import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Developer from '../components/Home/User/Developer'


export const AppRouter = () => {
  return (
    <div>
   
          <Routes>
            <Route path='/'element={<Developer/>} /> 

        </Routes>
          
  
    </div>
            /*Como hacer para que la ruta sea users*/
  )
}
