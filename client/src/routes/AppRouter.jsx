import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import Home  from '../components/home/Home'
import {Routes,Route} from "react-router-dom"
export const AppRouter = () => {
  return (
    <div>
  
          <Routes>
            <Route path='/'element={<Home/>} /> 

            <Route path='/*' element={ <Home/> } />
            <Route path='*' element={ <Home /> } />
   
        </Routes>
          
  
    </div>
            /*Como hacer para que la ruta sea users*/
  )
}
