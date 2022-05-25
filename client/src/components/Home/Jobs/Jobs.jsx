import React, { useState ,useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../../../redux/jobs/jobs'

function Jobs() {
    const jobs=useSelector(state=>state.jobs.jobs)
    const dispatch=useDispatch()
    useEffect(()=>{
      
      dispatch(fetchJobs())
     },   
    [dispatch])
  return (
    <div>Jobs</div>
  )
}

export default Jobs