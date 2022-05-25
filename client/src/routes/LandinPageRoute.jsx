import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { LandinPage } from '../components/landin_page/LandinPage'
import Developer from '../components/Home/Developer/Developer'
export const LandinPageRoute = () => {
  return (
    <div>

        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <LandinPage /> } />
            </Routes>
        </BrowserRouter>
        
    </div>
  )
}

