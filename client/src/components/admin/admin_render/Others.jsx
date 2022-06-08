import { useSelector } from "react-redux"
import { AdminFilterBar } from "./admin_filterbar/AdminFilterBar"

import './table.css'
import { adminOtherActions } from "../../../redux/admin/adminOtherSlice"

export const Others = () => {   
  
  const {others} = useSelector(state => state.adminOther)
  console.log(others)

  return (
    <div>
      <AdminFilterBar action={adminOtherActions}/>
      <table className="table">
          <thead className="table_headers">
            <tr>
              <th>Name</th>
              <th>Times Requested</th>
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
