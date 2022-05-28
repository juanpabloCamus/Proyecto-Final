import React ,{useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Post.module.css'
import { Link } from 'react-router-dom';
import { fetchJobs } from '../../../../redux/jobs/jobs';

export default function Post({id,position,salary_range,time,requirements,company_accounts,technologies,seniority,english_level,description}) {
  let companyName
  if (company_accounts === undefined) return null
  else {
    console.log(company_accounts);
    companyName = company_accounts[0].name
  }
  
  return (
    <Link to={`/home/post/${id}`}>
      <div className={styles.postCard}>
      <h1>{companyName}</h1>
      <h2>{position}</h2>
      <p>{salary_range}</p>
      <p>Time: {time}</p>
      <p>Seniority: {seniority}</p>
      {/* {techs.map(t => (<label key={t.id} >{t.name}</label>))} */}
    </div>
    </Link>
  )
}
