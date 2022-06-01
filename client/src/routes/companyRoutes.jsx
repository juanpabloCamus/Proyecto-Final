import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Company } from '../components/Home/Company/Company'



export const companyRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="company" element={<Company />} />
        </Routes>
    </div>
  )
}
