import React from 'react'

export default function Post({id,position,salary_range,time,requirements,langauge,company_accoounts}) {
  return (
    <div>
      <h1>{company_accoounts}</h1>
      <h2>{position}</h2>
      <p>{salary_range}</p>
      <p>{time}</p>
      <p>{requirements}</p>
      <p>{langauge}</p>

    </div>
  )
}
