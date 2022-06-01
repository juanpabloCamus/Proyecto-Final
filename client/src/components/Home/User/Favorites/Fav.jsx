import React from 'react'

function Fav({id,position,salary_range,time,requirements,seniority,company_accounts,technologies,description,english_level}) {
  return (
    <div>
      <img src={company_accounts[0].logo} alt="profile company"/>
      <h1>{company_accounts[0].name}</h1>
      <h1>{position}</h1>
      <p>{salary_range}</p>
      <p>{time}</p>
      <p>{english_level}
      </p>
      
    </div>
  )
}

export default Fav