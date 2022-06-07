import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { adminCompanyActions, fetchAdminCompanies } from "../../../redux/admin/adminCompanySlice"
import axios from "axios"

import { FaWindowClose } from "react-icons/fa"
import { MdDoneOutline } from 'react-icons/md'
import { AdminFilterBar } from "./admin_filterbar/AdminFilterBar"


export const CompaniesRender = () => {

  const {companies} = useSelector(state => state.adminCompany)
  
  const dispatch = useDispatch()
  
  useEffect(() =>{
    dispatch(fetchAdminCompanies())
  },[dispatch])


  const handleToggleButton = async(id) =>{
    try {
      await axios.delete(`/company/${id}`)
      dispatch(fetchAdminCompanies())
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <AdminFilterBar action={ adminCompanyActions }/>
         <table className="table">
             <thead className="table_headers">
                <tr>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                    <th>Reports </th>
                </tr>
             </thead>
        <tbody>
        { companies.length !== 0 ?
          companies.map((company, i) => (
            <tr key={i}>
              <td>
                {company.name}
              </td>
              <td>
                {company.email}
              </td>
              <td>
                {company.active?'Enabled':'Disabled'}
              </td>
              <td>
              {
                  company.active ? 
                  (<FaWindowClose className="disable_button" onClick={() => handleToggleButton(company.id)} title="Disable"/>) 
                  : 
                  (<MdDoneOutline className="enable_button" onClick={() => handleToggleButton(company.id)} title="Enable"/>)
                }
              </td>
              <td></td>
              <td>{company.reports}</td>
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
