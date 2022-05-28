import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../../redux/jobs/jobs";
import FilterBar from "../FilterBar/FilterBar";
import Post from "../Post/Post";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Posts.module.css";

export function Posts() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  console.log(jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  let i = 0;
  return (
    <div>
      <div>
        <SearchBar />
        <FilterBar />
      </div>
      <div className={styles.postsContainer}>
        {jobs ?
        jobs.length>0 ? (
          jobs[i].offers ?
          jobs[i].offers.map((e) => {
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
        <div>{jobs[i+1] ?<button>Ver mas</button>:<></>} </div>
      </div>
    </div>
  );
}

export default Posts;
