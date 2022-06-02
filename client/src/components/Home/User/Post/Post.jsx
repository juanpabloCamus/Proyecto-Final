import React from 'react'
import styles from './Post.module.css'
import { Link } from 'react-router-dom';

export default function Post({id,position,salary_range,time,requirements,company_accounts,technologies,seniority,english_level,description}) {
  let companyName
  let logo
  
  if (company_accounts === undefined) return null
  else {
    if(company_accounts[0]){
    logo = company_accounts[0].logo
    companyName = company_accounts[0].name
    }
  }
  
  let techs = technologies
  return (
    <Link to={`/home/post/${id}`}>
      <div className={styles.postCard}>
        <div className={styles.imgContainer}>
          {<img id={styles.logo} src={logo} alt="Company logo"></img>}
        </div>
        <div className={styles.detailsContainer}>
          {/* <h2>{companyName}</h2> */}
          <h3>{position}</h3>
          <div className={styles.subDetails}>
            <p>{salary_range === '10000$'? '+ 10000$': salary_range}</p>
            <p>Seniority: {seniority}</p>
            <p>Time: {time}</p>
          </div>
        </div>
        <div className={styles.techsContainer}>
          {techs.map(t => t.name==='Cplus' ?
            (<label key={t.id} >C+</label>) :
            t.name==='Cplusplus' ?
            (<label key={t.id} >C++</label>) :
            t.name==='CSharp' ?
            (<label key={t.id} >C#</label>) :
            (<label key={t.id} >{t.name}</label>))}
        </div>
      </div>
    </Link>
  )
}
