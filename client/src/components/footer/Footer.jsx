import {BsFillSuitHeartFill} from 'react-icons/bs'
import {IoIosRocket} from 'react-icons/io'
import { BsFacebook } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import { ImLinkedin } from 'react-icons/im'
import styles from './footer.module.css'


export const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.footer_box}>
        <div className={styles.footer_container}>
            <div className={styles.logo_container}>
                <span className={styles.footer_logo}>Rocket</span>
                <IoIosRocket className={styles.logo_icon}/>
            </div>
            <div className={styles.contact_us}>
              <h3>Want to know more about us?</h3>
              <div className={styles.social_media}>
                <BsFacebook />
                <BsTwitter />
                <ImLinkedin />
              </div>
            </div>
          </div>
        </div>
         <div className={styles.footer_box}>
            <div className={styles.bottom_footer}>
                <p>Made with <BsFillSuitHeartFill className={styles.footer_icon}/> by Henry students</p>
            </div>
         </div>
        
    </div>
  )
}
