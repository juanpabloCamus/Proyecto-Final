import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../navbar/Navbar";
import {fetchUsers} from "../../../redux/users/users"
import Post from "./Post/Post";
import styles from "./CompanyHome.module.css"
import { fetchCompanyProfile } from '../../../redux/Profile/profileData'
import { useParams } from "react-router";


function  CompanyHome() {
  const dispatch = useDispatch()
  const jobs = useSelector(state => state.jobs.jobs)
  const users = useSelector(state => state.users.users)
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  // const id = userLocalStorage.id;
  const company=useSelector(state=>state.company)
  const profile = useSelector(state => state.companyProfile)
  const { id } = useParams()
  console.log(id)

  useEffect(()=> {
      dispatch(fetchUsers())
      dispatch(fetchCompanyProfile(id))
  },[dispatch, id])

    return (
    <div>
         
        <Navbar/>
       
      {console.log(users)}
        {/* <CompanySerchBar /> */}
        <div className={styles.postsContainer}>{
            users.length>0?
            
            users.map(e=>
                {
                    return (
                    <>
                 <Post 
                 
                   key={e.id}
                   id={e.id}
                  profile_pic={e.profile_pic}
                  fullName={e.fullName}
                  email={e.email}
                  description={e.description}
                  technologies={e.technologies}


                 >


                 </Post>
                    
                    </>)
                }):<p>No hay usuarios</p>
            
            
          }
            
                
        </div>
        </div>
    
  )
}

{/* <div>
{<img src={logo} alt="Company logo"></img>}
</div>
<div><h2>{name}</h2></div>
  
{ data.loggedUser.jobs.map( j => (
<>
<div>
<h3>{j.position}</h3>
<div>
<p>{j.salary_range === '10000$'? '+ 10000$': j.salary_range}</p>
<p>Seniority: {j.seniority}</p>
<p>Time: {j.time}</p>
</div>
</div>
</>  
))} */}

export default CompanyHome;