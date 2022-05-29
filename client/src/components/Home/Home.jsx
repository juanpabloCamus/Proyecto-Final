import React   from 'react'
import { Navbar } from '../navbar/Navbar'
import { Company } from './Company/Company'

import Developer from './User/Developer'
import { UserNav } from '../navbar/user_nav/UserNav'
const Home = () => {


  return (
    //Hacer un if si es usuario se renderiza el developer
    //Sino la compania
    <div>
      <Navbar/>
      <Developer />
      <Company />
    </div>
  )
}

export default Home