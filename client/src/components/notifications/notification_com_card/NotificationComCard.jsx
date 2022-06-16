import { useNavigate } from 'react-router'
import { RiDeleteBinFill } from 'react-icons/ri'
import Swal from 'sweetalert2'

import styles from './notificationComCard.module.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCompanyNotifications } from '../../../redux/notifications/companyNotifications'


export const NotificationComCard = ({id, check, codeNoti, createdAt, meeting}) => {

const [refresh, setRefresh] = useState(false)
const dispatch = useDispatch()

const userLocalStorage = JSON.parse(localStorage.getItem("userData"))
const user_id = userLocalStorage.id

const {fullName, emailUser, dateTime, jobPosition} = meeting
const id_meet = meeting.id
const navigate = useNavigate()

let dateOfSend = new Date(createdAt).toDateString().split(" ").slice(1, 4).join(" ")

const checked = async () => {
  await axios.put(`/company/notis/${id}`)
}

if(check===false){
  checked()
}

useEffect(() =>{
  dispatch(fetchCompanyNotifications(user_id))
}, [dispatch, user_id, refresh])


const deleteNotification = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, remove it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'This notification has been removed',
      )

      try {
        await axios.delete(`/company/notis/${id}`)
      } catch (error) {
        console.log(error)
      }
     
    }
    setRefresh(true)
  })

  

}

  return (
  <div className={styles.notification_card}>
      <div>
        <RiDeleteBinFill 
        className={styles.delete_notification} 
        title="Delete"
        onClick={deleteNotification}
        />
      </div> 
      {jobPosition ?
        <>
          {
            codeNoti === 1 && (
              <>
                <div className={styles.notification_text}>
                      <p >From: {fullName}</p>
                      <p>Email: {emailUser}</p>
                      <p>Sent: {dateOfSend}</p>
                  </div>
                  <hr />
                  <p className={styles.notification_message}>Developer had accepted arrange an interview via Jitsi for the job position of: {jobPosition}</p>
                  <p>Scheduled meeting at: {dateTime}</p>
                    <br />
                  <div className={styles.notification_buttons}>
                      <button className={styles.notification_accept_button} onClick={() => navigate(`/company/meet/${id_meet}`)}>Go to Jitsi</button>
                  </div>
            </>
            )
          }
          {
            codeNoti === 2 && (
              <>
                <div className={styles.notification_text}>
                      <p >From: {fullName}</p>
                      <p>Email: {emailUser}</p>
                      <p>Sent: {dateOfSend}</p>
                  </div>
                  <hr />
                  <p className={styles.notification_message}>{emailUser} had declined the meeting sent for the job position {jobPosition}</p>
            </>
            )
          }
      </>
          :
        <>
        {
            codeNoti === 1 && (
              <>
                <div className={styles.notification_text}>
                      <p >From: {fullName}</p>
                      <p>Email: {emailUser}</p>
                      <p>Sent: {dateOfSend}</p>
                  </div>
                  <hr />
                  <p className={styles.notification_message}>Developer had accepted arrange an interview via Jitsi.</p>
                  <p>Scheduled meeting at: {dateTime}</p>
                    <br />
                  <div className={styles.notification_buttons}>
                      <button className={styles.notification_accept_button} onClick={() => navigate(`/company/meet/${id_meet}`)}>Go to Jitsi</button>
                  </div>
            </>
            )
          }
          {
            codeNoti === 2 && (
              <>
                <div className={styles.notification_text}>
                      <p >From: {fullName}</p>
                      <p>Email: {emailUser}</p>
                      <p>Sent: {dateOfSend}</p>
                  </div>
                  <hr />
                  <p className={styles.notification_message}>{fullName} had declined the meeting</p>
            </>
            )
          }
        </>
      }
    </div>
  )
}
