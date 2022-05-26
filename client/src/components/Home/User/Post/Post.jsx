import React from 'react'

export default function Post({id,position,salary_range,time,requirements,langauge,company_accounts}) {
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
      <p>{langauge}</p>

    </div>
  )
}
