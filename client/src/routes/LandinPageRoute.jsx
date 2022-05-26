import React from 'react'
import { LandinPage } from '../components/landin_page/LandinPage'
import { AppRouter } from './AppRouter'

export const LandinPageRoute = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <LandinPage /> } />
                <Route path='/home/*' element={ <AppRouter /> } />
            </Routes>
        </BrowserRouter>
        
    </div>
  )
}

