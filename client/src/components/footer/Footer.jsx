import { Link } from 'react-router-dom'

import {BsFillSuitHeartFill} from 'react-icons/bs'
import {IoIosRocket} from 'react-icons/io'

import styles from './footer.module.css'
import { Auth } from '../auth/Auth'


const handleFooterlogin = () =>{

}

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
              <h3>Want to know more?</h3>
              <button className={styles.footer_button} onClick={handleFooterlogin}>Join us</button>
            </div>
          </div>
        </div>
         <div className={styles.footer_box}>
            <div className={styles.bottom_footer}>
                <p>Made with <BsFillSuitHeartFill className={styles.footer_icon}/> by Henry students</p>
            </div>
         </div>
          <Auth />
    </div>
  )
}
