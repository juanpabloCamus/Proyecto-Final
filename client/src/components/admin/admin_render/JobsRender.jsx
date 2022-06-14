import { useDispatch, useSelector } from 'react-redux'
import { adminJobActions, fetchAdminJobs } from '../../../redux/admin/adminJobSlice'
import axios from 'axios'
import { useEffect } from 'react'

import { FaWindowClose } from 'react-icons/fa'
import { MdDoneOutline } from 'react-icons/md'
import { AdminFilterBar } from './admin_filterbar/AdminFilterBar'
import { BsInfoCircle } from "react-icons/bs";

export const JobsRender = () => {

  const { jobs } = useSelector(state => state.adminJob)
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(fetchAdminJobs())
  },[dispatch])

  const handleToggleButton = async(id) =>{
    try {
      await axios.delete(`/jobs/${id}`)
      dispatch(fetchAdminJobs())
    } catch (error) {
      console.log(error)
    }
   
  }

  return (
    <div>
      <AdminFilterBar action={ adminJobActions }/>
      <table className="table">
        <thead className="table_headers">
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th></th>
            <th></th>
            <th>Reports</th>
          </tr>
        </thead>
        <tbody>
        { jobs.length !== 0 ?
          jobs.map((job, i) => (
            <tr key={i}>
              <td>
                {job.company_accounts[0].name}
              </td>
              <td>
                {job.position}
              </td>
              <td>
                {job.active?'Enabled':'Disabled'}
              </td>
              <td>
              {
                  job.active ? 
                  (<FaWindowClose className="disable_button" onClick={() => handleToggleButton(job.id)} title="Disable"/>) 
                  : 
                  (<MdDoneOutline className="enable_button" onClick={() => handleToggleButton(job.id)} title="Enable"/>)
                }
              </td>
              <td></td>
              <td>{job.reports}
              <span className="field">
                        <BsInfoCircle />
                        <span className="quote">
                          <label>Spam:  <label>{job.reportSpam}</label>
                            </label><br/>
                            <label>Inappropiate Lenguaje: <label>{job.reportLang}</label>
                            </label><br/>
                            <label>False Information: <label>{job.reportFalse}</label>
                            </label><br/>
                         
                            <label>Inappropiate content:
                          <label>{job.reportCoIn}</label>
                            </label><br/>
                         
                          </span>
                         
                          
                       
                      </span>
                      </td>
            </tr>
          ))
          : 
          <p className="no_results">There are no results for your search</p>
        }
        </tbody>
      </table>
    </div>
  )
}
