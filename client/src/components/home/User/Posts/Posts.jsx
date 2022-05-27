import React ,{useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../../../../redux/jobs/jobs'
import FilterBar from '../FilterBar/FilterBar';
import Post from '../Post/Post';
import style from "./Posts.module.css"
import  NavBarUsers  from "../NavBar/NavBarUsers";

export function Posts() {
  const jobs=useSelector(state=>state.jobs.jobs)
const dispatch=useDispatch();

useEffect(()=>{
 
    dispatch(fetchJobs())



},[dispatch])
  return (
    <div >
      <div>
  <NavBarUsers/>
      </div >
      <div>      <FilterBar/>
      </div>
      <div className={style.cards}>
{console.log(jobs)}
      {jobs.length>0? jobs.map((e)=>{
        return (
          <div className={style.Recipes}  key={e.id} >
           <Post
           key={e.id}
           position={e.position}
           salary_range={e.salary_range}
           time={e.time}
           requirements={e.requirements}
           langauge={e.langauge}
           company_accounts={e.company_accounts}></Post>
          </div>
        )
      }):<p>No hay Nada</p>}
    </div>
    </div>
  )
}

export default Posts