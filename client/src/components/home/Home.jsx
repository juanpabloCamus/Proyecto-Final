import React   from 'react'
import Developer from './User/Developer'

const Home = () => {

  return (
    //Hacer un if si es usuario se renderiza el developer
    //Sino la compania
    
    <div><Developer/></div>
  )
}

export default Home