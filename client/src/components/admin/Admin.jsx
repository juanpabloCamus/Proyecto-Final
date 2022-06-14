import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminUsers } from '../../redux/admin/adminUsersSlice'
import { fetchAdminCompanies } from '../../redux/admin/adminCompanySlice'
import { fetchAdminJobs } from '../../redux/admin/adminJobSlice'
import { fetchAdminOthers } from '../../redux/admin/adminOtherSlice'
//Render Components
import { UsersRender } from './admin_render/UsersRender'
import { CompaniesRender } from './admin_render/CompaniesRender'
import { JobsRender } from './admin_render/JobsRender'
//Icons
import { FaUsers } from 'react-icons/fa'
import {FaUserAlt} from 'react-icons/fa'
import { MdWork } from 'react-icons/md'
import { AiFillProfile } from 'react-icons/ai'
import { FaBuilding } from 'react-icons/fa'
import { RiBuildingFill } from 'react-icons/ri'
import {GiTechnoHeart} from 'react-icons/gi'
import { RiCodeSSlashFill } from 'react-icons/ri'
import styles from './admin.module.css'
import { Others } from './admin_render/Others'


export const Admin = () => {

  window.scrollTo(0,0)


  const [ selectOption, setSelectOption ] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAdminUsers())
    dispatch(fetchAdminCompanies())
    dispatch(fetchAdminJobs())
    dispatch(fetchAdminOthers())
  }, [dispatch])

 const {usersLength} = useSelector(state => state.adminUsers)
 const {companiesLength} = useSelector(state => state.adminCompany)
 const {jobsLength} = useSelector(state => state.adminJob)
 const {othersLength} = useSelector(state => state.adminOther)

 if(usersLength === 0) return <p>Loading...</p>
 if(companiesLength === 0) return <p>Loading...</p>
 if(jobsLength === 0) return <p>Loading...</p>
//  if(othersLength === 0) return <p>Loading...</p>



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

          <li className={styles.side_bar_item}
              onClick={ () => setSelectOption("technologies") }
          >
            <GiTechnoHeart />
            <span>Technologies</span>
          </li>

        </ul>
        
      </aside>

      <main className={styles.admin_dashboard}>
        <div className={styles.dashboard_statistics}>

            <div className={styles.statistics_box}>
                <FaUserAlt className={styles.statistics_box_icon}/>
                <div className={styles.statistics_box_info}>
                  <h4>Users:</h4>
                  <span>{usersLength}</span>
                </div>
            </div>

            <div className={styles.statistics_box}>
                <RiBuildingFill className={styles.statistics_box_icon}/>
                <div className={styles.statistics_box_info}>
                  <h4>Companies:</h4>
                  <span>{companiesLength}</span>
                </div>
            </div>

            <div className={styles.statistics_box}>
                <AiFillProfile className={styles.statistics_box_icon}/>
                <div className={styles.statistics_box_info}>
                  <h4>Job Offers:</h4>
                  <span>{jobsLength}</span>
                </div>
            </div>

            <div className={styles.statistics_box}>
                <RiCodeSSlashFill className={styles.statistics_box_icon}/>
                <div className={styles.statistics_box_info}>
                  <h4>Other Techs:</h4>
                  <span>{othersLength}</span>
                </div>
            </div>

          </div>
          {<div className={styles.table_section}>
            {
              selectOption === "users" && <UsersRender />
            }
            {
              selectOption === "jobs" && <JobsRender />
            }
            {
              selectOption === "companies" && <CompaniesRender />
            }
            {
              selectOption === "technologies" && <Others />
            }
          </div>}
      </main>
    </div>
  )
}
