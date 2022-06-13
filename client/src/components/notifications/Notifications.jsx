import { useEffect } from 'react'
import { NotificationDevCard } from './notification_dev_card/NotificationDevCard'
import { NotificationComCard } from './notification_com_card/NotificationComCard'
import { fetchNotifications } from '../../redux/notifications/notifications'
import { AiFillNotification } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import styles from './notifications.module.css'
import { fetchCompanyNotifications } from '../../redux/notifications/companyNotifications'

export const Notifications = () => {

  const { id } = JSON.parse(localStorage.getItem("userData"))

  const {notifications} = useSelector( state => state.notifications)
  const {companyNotifications} = useSelector( state => state.companyNotifications)
  console.log(notifications)
  const dispatch = useDispatch()

  const userLocalStorage = JSON.parse(localStorage.getItem("userData"))

  const { fullName, name, profileType } = userLocalStorage

  useEffect(() => {
    dispatch(fetchNotifications(id))
    dispatch(fetchCompanyNotifications(id))
  },[dispatch, id])
  
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
            notifications ?
              notifications.length < 1 ? <p>You do not have any notifications yet</p> :
                notifications.map((n,i) => (
                
                  <NotificationDevCard
                  key={i}
                 
                  {...n}
                  />
                
              ))
            : <p>Loading</p>
          )
        }

        {
          profileType[0] === "company" && (
            <div>
              {
                companyNotifications ?
                  companyNotifications.length < 1 ? <p>You do not have any notifications yet</p> :
                    companyNotifications.map((n,i) => (
                      <NotificationComCard
                        key={i}
                        {...n}
                      />
                    ))
                  :<p>loading</p>
              }
            </div>
          )
        }
        

      </div>
    </div>
  )
}
