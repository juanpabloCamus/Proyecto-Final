import React from 'react'
import styles from './Post.module.css'
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

export default function Post({id,position,salary_range,time,requirements,company_accounts,technologies,seniority,english_level,description, active=true}) {
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
    <>
    {active?
    <Link to={`/home/post/${id}`} onClick={window.scrollTo(0,0)}>
      <div className={styles.postCard}>
        <div className={styles.imgContainer}>
          <Image
              cloudName="dlt2bs82a"
              publicId={logo}
              id={styles.logo}
       
            />
        </div>
        <div className={styles.detailsContainer}>
          <Link to={`/home/company/${company_accounts[0].id}`} onClick={window.scrollTo(0,0)}><h2 id={styles.companyName}>{companyName}</h2></Link>
          <h3>{position}</h3>
          <div className={styles.subDetails}>
            <p>{salary_range === '10000$'? '+ 10000$': salary_range}</p>
            <p>Seniority: {seniority}</p>
            <p>Time: {time}</p>
          </div>
        </div>
        <div className={styles.techsContainer}>
          {techs?.map(t => t.name==='Cplus' ?
            (<label key={t.id} >C+</label>) :
            t.name==='Cplusplus' ?
            (<label key={t.id} >C++</label>) :
            t.name==='CSharp' ?
            (<label key={t.id} >C#</label>) :
            (<label key={t.id} >{t.name}</label>))}
        </div>
      </div>
    </Link>
    :<></>
    }
    </>
  )
}
