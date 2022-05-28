import React from 'react'
import { LandinPage } from '../components/landin_page/LandinPage'
import { AppRouter } from './AppRouter'
import  { CompanyRouter } from './CompanyRouter'
import {Routes,Route,BrowserRouter} from "react-router-dom"

export const LandinPageRoute = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <LandinPage /> } />
                <Route path='/home/*' element={ <AppRouter /> } />
                <Route path='/company/*' element={ <CompanyRouter /> } />
            </Routes>
        </BrowserRouter>
        
    </div>
  )
}

