import { useSelector } from "react-redux"
import { FaWindowClose } from "react-icons/fa"

export const CompaniesRender = () => {

  const {companies} = useSelector(state => state.company)
   

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
                {company.country}
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
