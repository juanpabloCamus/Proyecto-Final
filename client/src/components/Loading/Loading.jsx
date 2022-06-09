import React from 'react'
import styles from './Loading.module.css'

function Loading() {
    return (
        <div className={styles.pageContainer}>
        <div>
        <div className={styles.rocket}>
        <div className={styles.rocketBody}>
          <div className={styles.body}></div>
          <div className={styles.fin} id={styles.finLeft}></div>
          <div className={styles.fin} id={styles.finRight}></div>
          <div className={styles.window}></div>
        </div>
        <div className={styles.exhaustFlame}></div>
        <ul className={styles.exhaustFumes}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul className={styles.star}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      </div>
      <h1 id={styles.loading}>Loading...</h1>
      </div>
    );
}

export default Loading;