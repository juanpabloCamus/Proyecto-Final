import React from 'react'
import style from "./Post.module.css";

export default function Post({id,position,salary_range,time,requirements,langauge,company_accounts}) {
  return (
    <div className={style.recipe}>

      <img src={company_accounts.length>0? company_accounts[0].logo:""} alt="" width="50px" height="50px"></img>
      {/* {console.log(company_accounts[0].name)} */}
     { company_accounts.length>0?
       <h1>{company_accounts[0].name}</h1>
      :
      <h1></h1>
    }
      <h2 className={style.name}>{position}</h2>
      <p>{salary_range}</p>
      <p>{time}</p>
      <p>{requirements}</p>
      <p>{langauge}</p>

    </div>
  )
}
