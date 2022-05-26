import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
 import { LandinPage } from '../components/landin_page/LandinPage'
import { AppRouter } from './AppRouter'

export const LandinPageRoute = () => {
  return (
    <div>

        <BrowserRouter>
            <Routes>
                <Route path='/' exact  element={ <LandinPage /> } /> 
                <Route path='/home/' element={<AppRouter/>} />

            </Routes>
        </BrowserRouter>
        
    </div>
  )
}

