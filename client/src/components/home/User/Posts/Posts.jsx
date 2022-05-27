import React ,{useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../../../../redux/jobs/jobs'
import FilterBar from '../FilterBar/FilterBar';
import Post from '../Post/Post';
import SearchBar from '../SearchBar/SearchBar';


export function Posts() {
  const jobs=useSelector(state=>state.jobs.jobs)
  console.log(jobs)
const dispatch=useDispatch();

useEffect(()=>{
 
    dispatch(fetchJobs())



},[dispatch])
  return (
    <div >
      <div>      <FilterBar/>
      </div>
      <div>
        <SearchBar/>
      </div>
      {jobs.length>0? jobs.map((e)=>{
        return (
          <div key={e.id} >
           <Post
           key={e.id}
           position={e.position}
           salary_range={e.salary_range}
           time={e.time}
           requirements={e.requirements}
           seniority={e.seniority}
           company_accounts={e.company_accounts}
           technologies={e.technologies}
           description={e.description}
           english_level={e.english_level}>
           
           </Post>
          </div>
        )
      }):<p>No hay Nada</p>}
    </div>
  )
}

export default Posts