import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { LandinPage } from '../components/landin_page/LandinPage'

export const LandinPageRoute = () => {
  return (
    <div>

        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={ <LandinPage /> } />
            </Routes>
        </BrowserRouter>
        
    </div>
  )
}

