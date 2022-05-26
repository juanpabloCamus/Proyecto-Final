import React ,{useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechs } from '../../redux/techs/techs'
import {fetchUsers} from '../../redux/users/users'
import { fetchCompany } from '../../redux/company/company'
import { fetchJobs } from '../../redux/jobs/jobs'

export const Home=()=> {

    const company=useSelector(state=>state.company.company)
    const jobs=useSelector(state=>state.jobs.jobs)
    const techs=useSelector(state=>state.techs.techs)
    const users=useSelector(state=>state.users.users)

    const dispatch=useDispatch();

    useEffect(()=>{
        
        dispatch(fetchCompany()) 
        dispatch(fetchUsers())
        dispatch(fetchJobs())
        dispatch(fetchTechs())



    },[dispatch])
  return (
      
    
    <div>Hola</div>
  )
}