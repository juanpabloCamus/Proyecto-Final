import { Route, Routes } from 'react-router-dom'
import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import Home  from '../components/home/Home'

export const AppRouter = () => {
  return (
    <div>
      <Navbar />
        <Routes>

            <Route path='/*' element={ <Home/> } />
            <Route path='*' element={ <Home /> } />
   
        </Routes>
    </div>
  )
}
