import React from 'react'

export default function Post({id,position,salary_range,time,requirements,company_accounts,technologies,seniority,english_level,description}) {
  return (
    <div>
      {/* {console.log(company_accounts[0].name)} */}
     { company_accounts.length>0?
       <h1>{company_accounts[0].name}</h1> :
      <h1></h1>
    }
      <h2>{position}</h2>
      <p>{salary_range}</p>
      <p>{time}</p>
      <p>{requirements}</p>
      <p>{english_level}</p>
      <p>{description}</p>
      <p>{seniority}</p>
      {technologies.length>0? <p>{technologies.map(e=><p>{e.name}</p>)}</p>:<p></p>}

    </div>
  )
}
