import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAdminCompanies } from "../../../redux/admin/adminCompanySlice"
import axios from "axios"

import { FaWindowClose } from "react-icons/fa"
import { MdDoneOutline } from 'react-icons/md'


export const CompaniesRender = () => {

  const {companies} = useSelector(state => state.adminCompany)
  
  const dispatch = useDispatch()
  
  useEffect(() =>{
    dispatch(fetchAdminCompanies())
  },[dispatch])


  const handleToggleButton = async(id) =>{
    try {
      await axios.delete(`http://localhost:3001/company/${id}`)
      dispatch(fetchAdminCompanies())
    } catch (error) {
      console.log(error)
    }
   
  }


  return (
    <div>
         <table className="table">
             <thead className="table_headers">
                <tr>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Status</th>
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
            </tr>
          ))
          : 
          <p>Loading...</p>
        }
        </tbody>
      </table>
    </div>
  )
}
