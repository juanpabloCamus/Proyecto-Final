import React from 'react'
import styles from './notificationCard.module.css'

export const NotificationCard = () => {



  return (
    <div className={styles.notification_card}>
        <div className={styles.notification_text}>
            <p >From: Microsoft</p>
            <p>Sent: June 17, 2022</p>
        </div>
        <hr />
        <p className={styles.notification_message}>Hi dear developer, as a company which wants to offers the best software solution services, we are contantly looking for new talents, so because of that we are interest in your profile. We would lik to know if you are avalible for an short meeting via Jitsi<br/> If you are interested please select one of the following schedules to arrange the meeting</p>

        <select className={styles.notification_select}>
            <option value="" selected disabled>Select schedule</option>
            <option value="">8am - 9am</option>
            <option value="">11am - 12am</option>
            <option value="">2pm - 3pm</option>
        </select>
        <div className={styles.notification_buttons}>
            <button className={styles.notification_accept_button}>Accept</button>
            <button className={styles.notification_decline_button}>Decline</button>
        </div>
    </div>
  )
}
