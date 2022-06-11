import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchNotifications } from '../../../redux/notifications/notifications'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { RiDeleteBinFill } from 'react-icons/ri'
import styles from './notificationDevCard.module.css'
import { useEffect, useState } from 'react'


export const NotificationDevCard = ({codeNoti, createdAt, meeting}) => {


const [refresh, setRefresh] = useState(false)


const userLocalStorage = JSON.parse(localStorage.getItem("userData"))

const user_id = userLocalStorage.id
const dispatch = useDispatch()
const navigate = useNavigate()

let dateOfSend = new Date(createdAt).toDateString().split(" ").slice(1, 4).join(" ")

useEffect(()=>{
  dispatch(fetchNotifications(user_id))
},[refresh, dispatch, user_id])

useEffect(() =>{
  
},[])

const { companyName,
  dateTime,
  messege,
  jobPosition,
  id,
  status} = meeting

  const handleAcceptClick = () => {
    acceptOrDecline(true, id)
    dispatch(fetchNotifications(user_id))
    Swal.fire({
      icon:"success",
      title:"You accept the meeting"
    })
    setRefresh(true)
  }

  const handleDeclineClick = () => {
    acceptOrDecline(false, id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, decline it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'The meeting has been declined',
        )
       
      }
      setRefresh(true)
    })
  }
  
  const acceptOrDecline = async(status, id) => {
    try {
      await axios.put(`/meeting/statusDev/${id}`, {status})
    } catch (err) {
      console.log(err)
    }
  }


  return (
    
      <div className={`${styles.notification_card} animate__animated animate__fadeInUp`}>
        <div>
          <RiDeleteBinFill className={styles.delete_notification} title="Delete"/>
        </div>
        {
          codeNoti === 1 && 
          <> 
              <div className={styles.notification_text}>
                <p >From: {companyName}</p>
                <p>Sent: {dateOfSend}</p>
                <p>Job position: {jobPosition}</p>
              </div>
              <hr />
              <p className={styles.notification_message}>Hi dear developer,</p>
              <p className={styles.notification_message}>{messege}</p>
              <p>The Company arrange a meeting to: <span className={styles.notification_meeting_date}>{dateTime}</span></p>
              
              <div className={styles.notification_buttons} >
                <button 
                className={`${styles.notification_accept_button} ${status !== null && status !== undefined ? styles.disable : null }`} 
                onClick={handleAcceptClick}
                disabled={refresh||status!==null?true:false}
                >Accept</button>
                <button className={`${styles.notification_decline_button} ${status !== null && status !== undefined ? styles.disable : null }`} 
                onClick={handleDeclineClick}
                disabled={refresh||status!==null?true:false}
                >Decline</button>
              </div>
              
          </>
        }

{
          codeNoti === 2 && 
          <> 
              <div className={styles.notification_text}>
                <p >From: {companyName}</p>
                <p>Sent: {dateOfSend}</p>
              </div>
              <hr />
              <h3 className={styles.notification2_title}>Congrats, {userLocalStorage.fullName}!</h3>
              <p>The meeting had been arranged to: <span className={styles.notification_meeting_date}>{dateTime}</span></p>
              <div className={styles.notification_buttons}>
                  <button className={styles.notification_accept_button} onClick={() => navigate(`/home/meet/${id}`)}>Go to Jitsi</button>
              </div>
          </>
        }
      </div>
  )
}
