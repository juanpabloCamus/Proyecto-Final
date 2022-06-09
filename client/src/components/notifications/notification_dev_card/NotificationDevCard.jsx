import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './notificationDevCard.module.css'
import { fetchNotifications } from '../../../redux/notifications/notifications'
import axios from 'axios'

export const NotificationDevCard = () => {

  const {notifications} = useSelector( state => state.notifications)

  const dispatch = useDispatch()

  //const [ state, setState ] = useState(null)

  const handleAcceptClick = () => {
    acceptOrDecline(true)
  }

  const handleDeclineClick = () => {
    acceptOrDecline(false)
  }
  
  const acceptOrDecline = async(status, id) => {
    try {
      const res = await axios.put(`/meeting/statusDev/${id}`, {status})
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    dispatch(fetchNotifications())
  },[dispatch])
  console.log(notifications)

  return (
    <div className={styles.notification_card}>
        <div className={styles.notification_text}>
            <p >From: Microsoft</p>
            <p>Sent: June 17, 2022</p>
        </div>
        <hr />
        <p className={styles.notification_message}>Hi dear developer, as a company which wants to offers the best software solution services, we are contantly looking for new talents, so because of that we are interest in your profile. We would lik to know if you are avalible for an short meeting via Jitsi<br/> If you are interested please select one of the following schedules to arrange the meeting</p>

        <select className={styles.notification_select}>
            <option value="" disabled>Select schedule</option>
            <option value="">8am - 9am</option>
            <option value="">11am - 12am</option>
            <option value="">2pm - 3pm</option>
        </select>
        <div className={styles.notification_buttons}>
            <button className={styles.notification_accept_button} onClick={handleAcceptClick}>Accept</button>
            <button className={styles.notification_decline_button} onClick={handleDeclineClick}>Decline</button>
        </div>
    </div>
  )
}
