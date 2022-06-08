import { NotificationCard } from './notification_card/NotificationCard'
import { AiFillNotification } from 'react-icons/ai'

import styles from './notifications.module.css'


export const Notifications = () => {

  const userLocalStorage = JSON.parse(localStorage.getItem("userData"))

  const { fullName } = userLocalStorage

  return (
    <div className={styles.notifications}>
      <h2>Hi, {fullName}</h2>
      <div className={styles.notifications_container}>
        <div className={styles.notifications_container_title}>
          <h4>Your Notifications</h4>
          <AiFillNotification />
        </div>
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  )
}
