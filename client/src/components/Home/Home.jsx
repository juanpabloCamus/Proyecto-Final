import React   from 'react'
import { useParams } from 'react-router'
import { Navbar } from '../navbar/Navbar'

import Developer from './User/Developer'
const Home = () => {

  const {id} = useParams()
  

  return (
    //Hacer un if si es usuario se renderiza el developer
    //Sino la compania
    <div>
      <Navbar id = {id}/>
      <Developer/>
    </div>
  )
}

export default Home