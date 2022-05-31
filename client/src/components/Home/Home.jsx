import React   from 'react'
import { Navbar } from '../navbar/Navbar'

import Developer from './User/Developer'
const Home = () => {


  return (
    //Hacer un if si es usuario se renderiza el developer
    //Sino la compania
    <div>
      <Navbar/>
      <Developer/>
     
    </div>
  )
}

export default Home