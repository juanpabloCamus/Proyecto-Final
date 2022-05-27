import React from 'react'
import styles from './Post.module.css'
import { Link } from 'react-router-dom';

export default function Post({id,position,salary_range,time,requirements,company_accounts,technologies,seniority,english_level,description}) {
  return (
    <Link to={`/home/post/${id}`}>
      <div className={styles.postCard}>
    {/* { company_accounts.length>0?
      <h1>{company_accounts[0].name}</h1> :
      <h1></h1>
    } */}
      <h2>{position}</h2>
      <p>{salary_range}</p>
      <p>Time: {time}</p>
      <p>Seniority: {seniority}</p>
      {/* {technologies.length>0? <p>{technologies.map(e=><p>{e.name}</p>)}</p>:<p></p>} */}
    </div>
    </Link>
  )
}
