import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import {Routes,Route} from "react-router-dom"
import CompanyHome  from '../components/Home/Company/CompanyHome'
import CompanyProfile from '../components/Profiles/ComProfile'

export const CompanyRouter = () => {
  
  return (
    <div>
  
          <Routes>
            
            <Route path='/*' element={ <CompanyHome/> } />
            <Route path='*' element={ <CompanyHome /> } />
            <Route path={'/:id'}element={<CompanyHome/>} /> 
            <Route path='/profile' element={ <CompanyProfile /> } />
        </Routes>
          
  
    </div>
            /*Como hacer para que la ruta sea users*/
  )
}
