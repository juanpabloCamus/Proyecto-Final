import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUsers } from '../../../redux/users/users'
import { fetchCompanyProfile } from '../../../redux/Profile/profileData'

function CompanyHome() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.auth)
  const users = useSelector(state => state.users.users)
  const profile = useSelector(state => state.companyProfile)
  const { id } = useParams()
  console.log(id)

  const { name, logo} = data

  //const { position, salary_range, seniority, time } = data.loggedUser.jobs[0]
  useEffect(()=> {
      dispatch(fetchUsers())
      dispatch(fetchCompanyProfile(id))
  },[dispatch, id])

  
  
    return (
    <div>
     {
       users.map(user=> (
         <h2>{user.fullName}</h2>
       ))
     }
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