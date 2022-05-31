import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../../redux/jobs/jobs";
import FilterBar from "../FilterBar/FilterBar";
import Post from "../Post/Post";
import styles from "./Posts.module.css";

export function Posts() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const userLocalStorage=JSON.parse(localStorage.getItem("user"))
  const [pagina, setPagina]=useState(0);
  const [render,setRender]= useState([])
  const [newJobs, setNewJobs] = useState([])

if(jobs!==newJobs){
  setNewJobs(jobs)
  setRender([])
  setPagina(0)
}
  
useEffect(() => {
  
  dispatch(fetchJobs());
 
}, [dispatch]);

useEffect(() => {
  let jobsRender = []
  if(render.length<1){
    if(jobs){
      if(jobs.length>0){
        if(jobs[pagina]){
          if(jobs[pagina].offers){
            if(jobsRender.length<pagina+1){
              for(let i=0;i<jobs[pagina].offers.length;i++){
                jobsRender.push(jobs[pagina].offers[i])
              }
              setRender(jobsRender)
            }
          }
        }
      }
    }
  }
  window.onscroll = function (){
    var scroll = window.scrollY + window.innerHeight > document.documentElement.offsetHeight/100*90
    if(scroll){
      if(jobs.length-1>pagina){
        setPagina(pagina+1)
      }
      if(jobs){
        if(jobs.length>0){
          if(jobs[pagina+1]){
            if(jobs[pagina+1].offers){
              if(jobsRender.length<pagina+1){
                for(let i=0;i<jobs[pagina+1].offers.length;i++){
                  jobsRender.push(jobs[pagina+1].offers[i])
                }
                let instancia = render.concat(jobsRender)
                setRender(instancia)
              }
            }
          }
        }
      }
    }
  }
},[jobs,pagina,render])


  return (
    <div>
      <div>
        <FilterBar />
      </div>
      <div className={styles.postsContainer}>
        {render ?
        render.length>0 ? (
          render ?
          render.map((e) => {
            return (
              <div key={e.id}>
                <div >
                  <Post
                    key={e.id}
                    id={e.id}
                    position={e.position}
                    salary_range={e.salary_range}
                    time={e.time}
                    requirements={e.requirements}
                    seniority={e.seniority}
                    company_accounts={e.company_accounts}
                    technologies={e.technologies}
                    description={e.description}
                    english_level={e.english_level}
                  ></Post>
                </div>
              </div>
            );
          }):<></>
        ) : (
          <p>No hay Oferta</p>
        ):<></>}      
      </div>
    </div>
  );
}

export default Posts;
