import { useSelector } from 'react-redux'
import { FaWindowClose } from 'react-icons/fa'


export const JobsRender = () => {

  const { allJobs } = useSelector(state => state.allJobs)
  const jobs = allJobs[0]?.offers || []


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
                {job.seniority}
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
