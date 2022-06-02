import { useSelector } from "react-redux"
import { FaWindowClose } from 'react-icons/fa'

import './table.css'

export const UsersRender = () => {

   const { users } = useSelector(state => state.users)

  return (
    <div>
        <table className="table">
          <thead className="table_headers">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Stack</th>
              <th></th>
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
                {user.stack}
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
