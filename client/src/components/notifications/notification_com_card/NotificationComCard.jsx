import { useNavigate } from 'react-router'
import { RiDeleteBinFill } from 'react-icons/ri'

import styles from './notificationComCard.module.css'


export const NotificationComCard = ({codeNoti, createdAt, meeting}) => {

const {fullName, emailUser, dateTime, jobPosition, id} = meeting
const navigate = useNavigate()

let dateOfSend = new Date(createdAt).toDateString().split(" ").slice(1, 4).join(" ")

  return (
  <div className={styles.notification_card}>
        <div>
          <RiDeleteBinFill className={styles.delete_notification} title="Delete"/>
        </div> 
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
                <button className={styles.notification_accept_button} onClick={() => navigate(`/company/meet/${id}`)}>Go to Jitsi</button>
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

            {/* <div className={styles.notification_buttons}>
                <button className={styles.notification_accept_button}>Send Link</button>
            </div> */}
      </>
      )
      
    }
    
      
        
    </div>
  )
}
