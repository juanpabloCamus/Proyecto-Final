import { useSelector } from 'react-redux'
import { FaWindowClose } from 'react-icons/fa'


export const JobsRender = () => {

  const { jobs } = useSelector(state => state.adminJob)

  console.log(jobs)

  return (
    <div>
      <table className="table">
        <thead className="table_headers">
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Seniority</th>
            <th></th>
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
