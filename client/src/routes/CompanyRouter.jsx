import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import CompanyHome  from '../components/home/Company/CompanyHome'
import {Routes,Route} from "react-router-dom"
export const CompanyRouter = () => {
  return (
    <div>
  
          <Routes>
            <Route path='/'element={<CompanyHome/>} /> 
            <Route path='/*' element={ <CompanyHome/> } />
            <Route path='*' element={ <CompanyHome /> } />
        </Routes>
          
  
    </div>
            /*Como hacer para que la ruta sea users*/
  )
}
