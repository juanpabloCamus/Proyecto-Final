import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../../redux/users/users";
import Post from "../Post/Post";
import styles from "./Favorites.module.css"
function Favorites() {
  const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
  const user = useSelector((state) => state.users.user);
  console.log(user)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUser(userLocalStorage.id));
  }, [dispatch, userLocalStorage.id]);
  return (
    <div className={styles.favorites}>
      <h2>My <span>Favorites</span></h2>
      <div className={styles.postsContainer}>
      {user[0] ? (
        user[0].jobs.length > 0 ? (
          user[0].jobs.map((e) => {
            return (

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
              />
            );
          })
        ) : (
          <h3>You don't have any favorite jobs</h3>
        )
      ) : (
        <></>
      )}
       </div>
    </div>
  );
}

export default Favorites;
