import React from 'react'
import { Image } from 'cloudinary-react';
import styles from "./NotificationsBell.module.css";


function NotificationsBell({id, logo, name, offer}) {
  return (
    <div className={styles.global}>
      <div key={id} className={styles.body}>
        <div className={styles.imgContainer}>
            {/* {<img id={styles.logo} src={logo} alt="Company logo"></img>} */}
            <Image
                cloudName="dhar2oawa"
                publicId={logo}
                className={styles.logo}
                //width="100"
                //crop="scale"
            />
        </div>
        <div>
          <label className={styles.label}><b>{name}</b> publish a new Offer: {offer}</label>
        </div>
      </div>
      

    </div>
  )
}

export default NotificationsBell