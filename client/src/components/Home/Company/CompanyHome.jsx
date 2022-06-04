import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/users/users";
import PostU from "./Post/Post";
import Post from "../User/Post/Post";
import styles from "./CompanyHome.module.css";
import { Link } from "react-router-dom";

import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { fetchCompany } from "../../../redux/company/company";
import PostJobOffer from "./Post/PostJobOffer";

function CompanyHome() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  console.log(users)
  const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
  const id = userLocalStorage.id; //id de la empresa
  const company = useSelector((state) => state.company.company);
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
            if(users[pagina].offers){
              if(usersRender.length<pagina+1){
                for(let i=0;i<users[pagina].offers.length;i++){
                  usersRender.push(users[pagina].offers[i])
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
              if(users[pagina+1].offers){
                if(usersRender.length<pagina+1){
                  for(let i=0;i<users[pagina+1].offers.length;i++){
                    usersRender.push(users[pagina+1].offers[i])
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

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCompany(id));
  }, [dispatch]);

  const radioStorage = JSON.parse(localStorage.getItem("radio"));
  let [radio, setRadio] = useState(radioStorage || "offers");
  localStorage.setItem("radio", JSON.stringify(radio));

  // setRadio(radioStorage)
  function handleCircle(e) {
    console.log(document.getElementById(e));
    let isChecked = e.target.checked;
    if (isChecked) {
      console.log(e.target.value);
      if (e.target.value === "developers") {
        setRadio("developers");
      } else setRadio("offers");
    }
    // if (!isChecked) {
    //   setRadio("developers")
    // }
  }

  return (
    <div className={styles.company_container}>
      {radio === "developers" ? (
        <div>
          <h2>
            Search for new <span>Talent.</span>
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
              {/* Create new job */}
              <BsFileEarmarkPlusFill className={styles.createjob_button_icon} />
            </Link>
          </div>
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
            Search for new <span>Job Offers.</span>
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
              {/* Create new job */}
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
                    />
                  </div>
                );
              })
            ) : (
              <p>No hay usuarios</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyHome;
