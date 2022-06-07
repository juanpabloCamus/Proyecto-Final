import { useSelector } from "react-redux"
import { FaWindowClose } from 'react-icons/fa'

import './table.css'

export const Others = () => {   
  
  const {others} = useSelector(state => state.adminOther)
  console.log(others)

  return (
    <div>

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
        {/* { others.length !== 0 ?
          others.map((user, i) => (
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
        } */}
      </tbody>
      </table>

    </div>
  )
}
