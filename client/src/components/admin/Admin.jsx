import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUsers } from 'react-icons/fa'
import {FaUserAlt} from 'react-icons/fa'
import { MdWork } from 'react-icons/md'
import { AiFillProfile } from 'react-icons/ai'
import { UsersRender } from './admin_render/UsersRender'
import { JobsRender } from './admin_render/JobsRender'
import { fetchAllJobs } from '../../redux/jobs/allJobs'
import { fetchUsers } from '../../redux/users/users'
import { FaBuilding } from 'react-icons/fa'
import { RiBuildingFill } from 'react-icons/ri'

import styles from './admin.module.css'
import { fetchCompanies } from '../../redux/company/company'
import { CompaniesRender } from './admin_render/CompaniesRender'

export const Admin = () => {


  const [ selectOption, setSelectOption ] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllJobs())
    dispatch(fetchUsers())
    dispatch(fetchCompanies())
  })

 

 

  return (
    <div className={styles.admin_container}>
      <aside className={styles.admin_side_bar}>

        <div className={styles.side_bar_title}>
          <h3>Admin Dashboard</h3>
        </div>

        <ul className={styles.side_bar_menu}>
          <li className={styles.side_bar_item}
              onClick={ () => setSelectOption("users") }
          >
            <FaUsers />
            <span>Users</span>
          </li>

          <li className={styles.side_bar_item}
              onClick={ () => setSelectOption("companies") }
          >
            <FaBuilding />
            <span>Companies</span>
          </li>

          <li className={styles.side_bar_item}
            onClick={() => setSelectOption("jobs")}
          >
            <MdWork/>
            <span>Jobs Offers</span>  
          </li>
        </ul>
        
      </aside>

      <main className={styles.admin_dashboard}>
        <div className={styles.dashboard_statistics}>

            <div className={styles.statistics_box}>
                <FaUserAlt className={styles.statistics_box_icon}/>
                <div className={styles.statistics_box_info}>
                  <h4>Users:</h4>
                  <span>100</span>
                </div>
            </div>

            <div className={styles.statistics_box}>
                <RiBuildingFill className={styles.statistics_box_icon}/>
                <div className={styles.statistics_box_info}>
                  <h4>Companies:</h4>
                  <span>100</span>
                </div>
            </div>

            <div className={styles.statistics_box}>
                <AiFillProfile className={styles.statistics_box_icon}/>
                <div className={styles.statistics_box_info}>
                  <h4>Job Offers:</h4>
                  <span>100</span>
                </div>
            </div>

          </div>
          <div className={styles.table_section}>
            {
              selectOption === "users" && <UsersRender />
            }
            {
              selectOption === "jobs" && <JobsRender />
            }
            {
              selectOption === "companies" && <CompaniesRender />
            }

          </div>
      </main>
    </div>
  )
}
