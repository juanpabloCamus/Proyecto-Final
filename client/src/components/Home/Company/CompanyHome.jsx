import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar } from "../../navbar/Navbar";
import CreateJob from './CreateJob/CreateJob'

function  CompanyHome() {
  const dispatch = useDispatch()
  const jobs = useSelector(state => state.jobs.jobs)
  
    return (
    <div>
         
        <Navbar/>
       
        <h1> Published Jobs </h1>
        {/* <CompanySerchBar /> */}
        <div>
            {jobs.map( j => (
                <div>
                    <Link>
                        <h2>{j.position}</h2>
                        <h3>{j.time}</h3>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CompanyHome;