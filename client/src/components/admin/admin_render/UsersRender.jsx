import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { adminUsersActions, fetchAdminUsers } from "../../../redux/admin/adminUsersSlice"
import axios from "axios"

import { FaWindowClose } from 'react-icons/fa'
import { MdDoneOutline } from 'react-icons/md'
import { AdminFilterBar } from "./admin_filterbar/AdminFilterBar"

import './table.css'

export const UsersRender = () => {

  const {users} = useSelector(state => state.adminUsers)
   
  const dispatch = useDispatch()
  

  useEffect(() =>{
    dispatch(fetchAdminUsers())
  },[dispatch])


  const handleToggleButton = async(id) =>{
    try {
      await axios.delete(`/users/${id}`)
      dispatch(fetchAdminUsers())
    } catch (error) {
      console.log(error)
    }
    
  }



  return (
    <div>
      <AdminFilterBar action={ adminUsersActions }/>
        <table className="table">
          <thead className="table_headers">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
              <th></th>
              <th>Reports</th>
            </tr>
          </thead>
        <tbody>
        { users.length !== 0 ?
          users.map((user, i) => (
            <tr key={i}>
              <td>
                {user.fullName}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.active?'Enabled':'Disabled'}
              </td>
              <td>
                {
                  user.active ? 
                  (<FaWindowClose className="disable_button" onClick={() => handleToggleButton(user.id)} title="Disable"/>) 
                  : 
                  (<MdDoneOutline className="enable_button" onClick={() => handleToggleButton(user.id)} title="Enable"/>)
                }
    
              </td>
              <td></td>
              <td>{user.reports}</td>
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
