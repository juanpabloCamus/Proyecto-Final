import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotifications } from '../../../redux/notifications/notifications'
import { useNavigate } from 'react-router'

import { RiDeleteBinFill } from 'react-icons/ri'

import styles from './notificationDevCard.module.css'

export const NotificationDevCard = ({codeNoti, createdAt, meeting}) => {

const userLocalStorage = JSON.parse(localStorage.getItem("userData"))
const {notifications} = useSelector(state => state.notifications)

const user_id = userLocalStorage.id
const dispatch = useDispatch()
const navigate = useNavigate()

let dateOfSend = new Date(createdAt).toDateString().split(" ").slice(1, 4).join(" ")


const { companyName,
  dateTime,
  messege,
  id} = meeting

  console.log(meeting)

  const handleAcceptClick = () => {
    acceptOrDecline(true, id)
    dispatch(fetchNotifications(user_id))
  }

  const handleDeclineClick = () => {
    acceptOrDecline(false, id)
  }
  
  const acceptOrDecline = async(status, id) => {
    console.log(status, id)
    try {
      const res = await axios.put(`/meeting/statusDev/${id}`, {status})
      console.log(res.data)
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
              </div>
              <hr />
              <p className={styles.notification_message}>Hi dear developer,</p>
              <p className={styles.notification_message}>{messege}</p>
              <p>The Company arrange a meeting to: <span className={styles.notification_meeting_date}>{dateTime}</span></p>
              <div className={styles.notification_buttons}>
                  <button className={styles.notification_accept_button} onClick={handleAcceptClick}>Accept</button>
                  <button className={styles.notification_decline_button} onClick={handleDeclineClick}>Decline</button>
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
                  <button className={styles.notification_accept_button} onClick={() => navigate("/meet")}>Go to Jitsi</button>
              </div>
          </>
        }
      </div>
  )
}
