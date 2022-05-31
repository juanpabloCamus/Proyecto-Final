import React from 'react'
import {Routes,Route} from "react-router-dom"
import CompanyHome  from '../components/Home/Company/CompanyHome'
import CreateJob from '../components/Home/Company/CreateJob/CreateJob'
export const CompanyRouter = () => {
  return (
    <div>
  
          <Routes>
            <Route path='/'element={<CompanyHome/>} /> 
            <Route path='/*' element={ <CompanyHome/> } />
            <Route path='*' element={ <CompanyHome /> } />
            <Route path='/createjob' element={ <CreateJob /> } />
            <Route path={'post/:id'} />
        </Routes>
          
  
    </div>
            /*Como hacer para que la ruta sea users*/
  )
}
