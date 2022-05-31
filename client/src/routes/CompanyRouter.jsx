import React from 'react'
import {Routes,Route} from "react-router-dom"
import CompanyHome  from '../components/Home/Company/CompanyHome'
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
