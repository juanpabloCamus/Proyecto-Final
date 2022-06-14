import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/users/users";
import PostU from "./Post/Post";
import styles from "./CompanyHome.module.css";
import { Link } from "react-router-dom";

import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { fetchCompany } from "../../../redux/company/company";
import PostJobOffer from "./Post/PostJobOffer";
import FilterBarUser from "./FilterBarUser/FilterBarUser";

function CompanyHome() {
  const dispatch = useDispatch();
  const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
  const id = userLocalStorage.id; //id de la empresa
  const users = useSelector((state) => state.users.users);
  const company = useSelector((state) => state.company.company);
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCompany(id));
  }, [dispatch, id]);

  const [pagina, setPagina]=useState(0);
  const [render,setRender]= useState([])
  const [newUsers, setNewUsers] = useState([])

  if(users!==newUsers){
    setNewUsers(users)
    setRender([])
    setPagina(0)
  }

  useEffect(() => {
    let usersRender = []
    if(render.length<1){
      if(users){
        if(users.length>0){
          if(users[pagina]){
            if(users[pagina].users){
              if(usersRender.length<pagina+1){
                for(let i=0;i<users[pagina].users.length;i++){
                  usersRender.push(users[pagina].users[i])
                }
                setRender(usersRender)
              }
            }
          }
        }
      }
    }
    window.onscroll = function (){
      var scroll = window.scrollY + window.innerHeight > document.documentElement.offsetHeight/100*90
      if(scroll){
        if(users.length-1>pagina){
          setPagina(pagina+1)
        }
        if(users){
          if(users.length>0){
            if(users[pagina+1]){
              if(users[pagina+1].users){
                if(usersRender.length<pagina+1){
                  for(let i=0;i<users[pagina+1].users.length;i++){
                    usersRender.push(users[pagina+1].users[i])
                  }
                  let instancia = render.concat(usersRender)
                  setRender(instancia)
                }
              }
            }
          }
        }
      }
    }
  },[users,pagina,render])


  const radioStorage = JSON.parse(localStorage.getItem("radio"));
  let [radio, setRadio] = useState(radioStorage || "offers");
  localStorage.setItem("radio", JSON.stringify(radio));

  function handleCircle(e) {
    let isChecked = e.target.checked;
    if (isChecked) {
      if (e.target.value === "developers") {
        setRadio("developers");
      } else setRadio("offers");
    }
  }


  return (
    <div className={styles.company_container}>
      {radio === "developers" ? (
        <div>
          <h2>
            Search for new <span>Talent</span>
          </h2>

          <div
            className={styles.createjob_button_container}
            title="New Job Offer"
          >
            <div className={styles.container_checkbox}>
              <div className={styles.div_checkbox_radio}>
                <input
                  className={styles.checkbox}
                  type="radio"
                  id="offers"
                  name="radio"
                  value={"offers"}
                  checked={radio === "offers"}
                  onChange={(e) => handleCircle(e)}
                />
                <label className={styles.label}>Job Offers</label>
              </div>
              <div className={styles.div_checkbox_radio}>
                <input
                  className={styles.checkbox}
                  type="radio"
                  id="developers"
                  name="radio"
                  value={"developers"}
                  checked={radio === "developers"}
                  onChange={(e) => handleCircle(e)}
                />
                <label className={styles.label}>Developers</label>
              </div>
            </div>
            <Link to="/company/createjob" className={styles.createjob_button}>
              <label>Create job  </label>
              <BsFileEarmarkPlusFill className={styles.createjob_button_icon} />
            </Link>
          </div>
            <FilterBarUser/>
          <div className={styles.postsContainer}>
            {render.length > 0 ? (
              render.map((e) => {
                return (
                  <PostU
                    key={e.id}
                    id={e.id}
                    profile_pic={e.profile_pic}
                    fullName={e.fullName}
                    email={e.email}
                    description={e.description}
                    seniority={e.seniority}
                    english_level={e.english_level}
                    stack={e.stack}
                    technologies={e.technologies}
                  ></PostU>
                );
              })
            ) : (
              <p>No hay usuarios</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>
            My Job<span> Offers</span>
          </h2>

          <div
            className={styles.createjob_button_container}
            title="New Job Offer"
          >
            <div className={styles.container_checkbox}>
              <div className={styles.div_checkbox_radio}>
                <input
                  className={styles.checkbox}
                  type="radio"
                  id="offers"
                  name="radio"
                  value={"offers"}
                  checked={radio === "offers"}
                  onChange={(e) => handleCircle(e)}
                />
                <label className={styles.label}>Job Offers</label>
              </div>
              <div className={styles.div_checkbox_radio}>
                <input
                  className={styles.checkbox}
                  type="radio"
                  id="developers"
                  name="radio"
                  value={"developers"}
                  checked={radio === "developers"}
                  onChange={(e) => handleCircle(e)}
                />
                <label className={styles.label}>Developers</label>
              </div>
            </div>
            <Link to="/company/createjob" className={styles.createjob_button}>
              <label>Create job  </label>
              <BsFileEarmarkPlusFill className={styles.createjob_button_icon} />
            </Link>
          </div>

          <div className={styles.postsContainer}>
            {company.jobs ? (
              company.jobs.map((e) => {
                return (
                  <div key={e.id}>
                    <PostJobOffer
                      key={e.id}
                      id={e.id}
                      position={e.position}
                      salary_range={e.salary_range}
                      seniority={e.seniority}
                      time={e.time}
                      technologies={e.technologies}
                      applications = {e.applied_jobs}
                      active={e.active}
                    />
                  </div>
                );
              })
            ) : (
              <p>There are no published users yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyHome;
