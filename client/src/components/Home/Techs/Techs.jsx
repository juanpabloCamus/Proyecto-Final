import React ,{useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechs } from '../../../redux/techs/techs'


function Techs() {
    const techs=useSelector(state=>state.techs.techs)
    
  const dispatch=useDispatch()
  useEffect(()=>{
    
    dispatch(fetchTechs())
   },   
  [dispatch])


  return (
    <div>Techs</div>
  )
}

export default Techs