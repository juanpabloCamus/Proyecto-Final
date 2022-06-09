
import styles from './notificationDevCard.module.css'

import axios from 'axios'

export const NotificationDevCard = ({
  companyName,
  dateTime,
  messege,
  id
}) => {

  //const [ state, setState ] = useState(null)

  console.log(id)

  const handleAcceptClick = () => {
    acceptOrDecline(true, id)
  }

  const handleDeclineClick = () => {
    acceptOrDecline(false, id)
  }
  
  const acceptOrDecline = async(status, id) => {
    console.log(status, id)
    try {
      const res = await axios.put(`/meeting/statusDev/${id}`, {status})
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <div className={styles.notification_card}>
        <div className={styles.notification_text}>
            <p >From: {companyName}</p>
            <p>Sent: June 17, 2022</p>
        </div>
        <hr />
        <p className={styles.notification_message}>Hi dear developer, as a company which wants to offers the best software solution services, we are contantly looking for new talents, so because of that we are interest in your profile. We would lik to know if you are avalible for an short meeting via Jitsi<br/> If you are interested please select one of the following schedules to arrange the meeting</p>
        <p>{messege}</p>
        <p>The meeting had been arranged the: {dateTime} </p>
        <div className={styles.notification_buttons}>
            <button className={styles.notification_accept_button} onClick={handleAcceptClick}>Accept</button>
            <button className={styles.notification_decline_button} onClick={handleDeclineClick}>Decline</button>
        </div>
      </div>
  )
}
