import React   from 'react'
import { Navbar } from '../navbar/Navbar'
<<<<<<< HEAD
import { UserNav } from '../navbar/user_nav/UserNav'
=======
import { Company } from './Company/Company'

>>>>>>> b16926ecfdd2d8612a7a5d4dd032a26da07c9cdd
import Developer from './User/Developer'

const Home = () => {


  return (
    //Hacer un if si es usuario se renderiza el developer
    //Sino la compania
    <div>
      <UserNav/>
      <Developer />
      <Company />
    </div>
  )
}

export default Home