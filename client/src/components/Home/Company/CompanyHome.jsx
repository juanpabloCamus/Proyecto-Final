import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/users/users";
import Post from "./Post/Post";
import styles from "./CompanyHome.module.css";
import { Link } from "react-router-dom";

import {BsFileEarmarkPlusFill} from 'react-icons/bs'


function CompanyHome() {


  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const users = useSelector((state) => state.users.users);
  const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
  const id = userLocalStorage.id;
  const company = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);



  return (
    <div className={styles.company_container}>
      <h2>Search for new <span>Talent.</span></h2>
      {/* <CompanySerchBar /> */}
      <div className={styles.createjob_button_container} title="New Job Offer">
        <Link to="/company/createjob" className={styles.createjob_button}>
            {/* Create new job */}
            <BsFileEarmarkPlusFill className={styles.createjob_button_icon} />
        </Link>
      </div>
      <div className={styles.postsContainer}>
        {users.length > 0 ? (
          users.map((e, i) => {
            return (
             
                <Post
                  key={i}
                  id={e.id}
                  profile_pic={e.profile_pic}
                  fullName={e.fullName}
                  email={e.email}
                  description={e.description}
                  technologies={e.technologies}
                ></Post>
              
            );
          })
        ) : (
          <p>No hay usuarios</p>
        )}
      </div>
    </div>
  );
}

export default CompanyHome;
