import styles from './notificationComCard.module.css'

export const NotificationComCard = () => {


  return (
    <div className={styles.notification_card}>
        <div className={styles.notification_text}>
            <p >From: Developer</p>
            <p>Sent: June 17, 2022</p>
        </div>
        <hr />
        <p className={styles.notification_message}>Developer had accepted arrange an interview via Jitsi</p>

        <div className={styles.notification_buttons}>
            <button className={styles.notification_accept_button}>Send Link</button>
        </div>
    </div>
  )
}
