import React ,{useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Post.module.css'
import { Link } from 'react-router-dom';
import { fetchJobs } from '../../../../redux/jobs/jobs';

export default function Post({id,position,salary_range,time,requirements,company_accounts,technologies,seniority,english_level,description}) {
  let companyName
  let logo
  
  // if (company_accounts === undefined) return null
  // else {
  //   logo = company_accounts[0].logo
  //   companyName = company_accounts[0].name
  // }
  
  let techs = technologies
  return (
    <Link to={`/home/post/${id}`}>
      <div className={styles.postCard}>
        <div className={styles.imgContainer}>
          {/* <img id={styles.logo} src={logo} alt="Company logo"></img> */}
        </div>
        <div className={styles.detailsContainer}>
          <h2>{companyName}</h2>
          <h3>{position}</h3>
          <div className={styles.subDetails}>
            <p>{salary_range}</p>
            <p>Horario: {time}</p>
            <p>Seniority: {seniority}</p>
          </div>
        </div>
        <div className={styles.techsContainer}>
          {techs.map(t => (<label key={t.id} >{t.name}</label>))}
        </div>
      </div>
    </Link>
  )
}
