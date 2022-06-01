import React from 'react'
import styles from './notfound.module.css'
import img_404 from '../../assets/404_img.png'


export const NotFound = () => {
  return (
    <div className={styles.not_found_page}>
      <img src={img_404} alt="not found" />
    </div>
  )
}
