import React ,{useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../../../../redux/jobs/jobs'
import Post from '../Post/Post';


export function Posts() {
  const jobs=useSelector(state=>state.jobs.jobs)
const dispatch=useDispatch();

useEffect(()=>{
 
    dispatch(fetchJobs())



},[dispatch])
  return (
    <div >
      {jobs.length>0?jobs?.map((e)=>{
        return (
          <div >
           <Post
           key={e.id}
           position={e.position}
           salary_range={e.salary_range}
           time={e.time}
           requirements={e.requirements}
           langauge={e.langauge}
           company_accoounts={e.company_accoounts?.map(e.name)}></Post>
          </div>
        )
      }):<p>No hay Nada</p>}
    </div>
  )
}

export default Posts