import { Routes ,Route} from 'react-router-dom'
import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import Developer from '../components/Home/Developer/Developer'
import Company from '../redux/company/company'
import Jobs from '../redux/jobs/jobs'
import Techs from '../redux/techs/techs'

export const AppRouter = () => {
  return (
    <div>
      <Navbar />
        <Routes>

            <Route path='/users' element={<Developer/>} />
            <Route path='/company' element={ <Company /> } />   
            <Route path='/jobs' element={ <Jobs /> } />
            <Route path='/techs' element={ <Techs /> } /> 

   
        </Routes>
    </div>
  )
}
