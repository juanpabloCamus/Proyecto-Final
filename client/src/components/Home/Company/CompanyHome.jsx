import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/users/users";
import Post from "./Post/Post";
import styles from "./CompanyHome.module.css";



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
    <div>
      {/* <CompanySerchBar /> */}
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
