import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function  CompanyHome() {
  const dispatch = useDispatch()
  const jobs = useSelector(state => state.job)
  
    return (
    <div>
        <h1> Published Jobs </h1>
        {/* <CompanySerchBar /> */}
        {/* <div>
            {jobs.map( j => (
                <div>
                    <Link>
                        <h2>{j.position}</h2>
                        <h3>{j.time}</h3>
                    </Link>
                </div>
            ))}
        </div> */}
    </div>
  )
}

export default CompanyHome;