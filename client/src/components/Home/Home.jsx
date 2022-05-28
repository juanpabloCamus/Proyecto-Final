import React   from 'react'
import { Navbar } from '../navbar/Navbar'
import { UserNav } from '../navbar/user_nav/UserNav'
import Developer from './User/Developer'

const Home = () => {


  return (
    //Hacer un if si es usuario se renderiza el developer
    //Sino la compania
    <div>
      <UserNav/>
      <Developer />

    </div>
  )
}

export default Home