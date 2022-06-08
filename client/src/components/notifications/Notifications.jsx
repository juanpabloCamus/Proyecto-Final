import { NotificationDevCard } from './notification_dev_card/NotificationDevCard'
import { NotificationComCard } from './notification_com_card/NotificationComCard'

import { AiFillNotification } from 'react-icons/ai'

import styles from './notifications.module.css'


export const Notifications = () => {

  const userLocalStorage = JSON.parse(localStorage.getItem("userData"))

  const { fullName, name, profileType } = userLocalStorage
  

  return (
    <div className={styles.notifications}>
      <h2>Hi, {fullName ? fullName : name}</h2>
      <div className={styles.notifications_container}>
        <div className={styles.notifications_container_title}>
          <h4>Your Notifications</h4>
          <AiFillNotification />
        </div>
        {
          profileType[0] === "develop" && (
            <div>
              <NotificationDevCard />
              <NotificationDevCard />
            </div>
          )
        }

        {
          profileType[0] === "company" && (
            <div>
              <NotificationComCard/>
            </div>
          )
        }
        

      </div>
    </div>
  )
}
