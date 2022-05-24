import { Route, Routes } from 'react-router-dom'
import React from 'react'
import { Navbar } from '../components/navbar/Navbar'

export const AppRouter = () => {
  return (
    <div>
      <Navbar />
        <Routes>

            {/* <Route path='/*' element={ <Main /> } />
            <Route path='dog/:dogId' element={ <DogDescription /> } />   
            <Route path='newbreed' element={ <CreateBreed /> } />
            <Route path='*' element={ <Home /> } /> */}
   
        </Routes>
    </div>
  )
}
