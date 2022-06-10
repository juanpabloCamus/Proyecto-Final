import { useDispatch, useSelector } from "react-redux"
import { AdminFilterBar } from "./admin_filterbar/AdminFilterBar"
import { FaPlusSquare } from 'react-icons/fa'
import { adminOtherActions, fetchAdminOthers } from "../../../redux/admin/adminOtherSlice"
import axios from "axios"
import { useEffect } from "react"

import Swal from "sweetalert2"

import './table.css'

export const Others = () => {   
  
 
  const {others} = useSelector(state => state.adminOther)
  const dispatch = useDispatch()


  useEffect(() =>{
    dispatch(fetchAdminOthers())
  },[dispatch])

  const handleAddNewTech = async(id) =>{
    try {
      await axios.post(`/techs/${id}`)
      dispatch(fetchAdminOthers())

      Swal.fire({
        icon:"success",
        text:"Technology added"
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <AdminFilterBar action={adminOtherActions}/>
      <table className="table">
          <thead className="table_headers">
            <tr>
              <th>Name</th>
              <th>Times Requested</th>
              <th>Add new technology</th>
            </tr>
          </thead>
        <tbody>
        { others.length !== 0 ?
          others.map((other, i) => (
            <tr key={i}>
              <td>
                {other.name}
              </td>
              <td>
                {other.count}
              </td>
              <td>
                  <FaPlusSquare onClick={() => handleAddNewTech(other.id)} className="add_new_tech_button"/>
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
