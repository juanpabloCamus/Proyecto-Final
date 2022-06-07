import { useSelector } from "react-redux"
import { FaWindowClose } from 'react-icons/fa'

import './table.css'
import { AdminFilterBar } from "./admin_filterbar/AdminFilterBar"

export const UsersRender = () => {

   const { users } = useSelector(state => state.users)

   console.log(users)

  return (
    <div>
      {/* <AdminFilterBar /> */}
        <table className="table">
          <thead className="table_headers">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
        <tbody>
        { users.length !== 0 ?
          users[0].offers.map((user, i) => (
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
                <FaWindowClose className="delete_button"/>
              </td>
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
