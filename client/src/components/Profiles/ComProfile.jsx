import React from "react";
import styles from './ComProfile.module.css';
import { Navbar } from "../navbar/Navbar";
import { useSelector } from "react-redux";
import location from '../../assets/location.png';
import size from '../../assets/size.png';
import web from '../../assets/website.png';

function ComProfile() {

    const user = {
        name:'Microsoft',
        email:'microsoft@gmail.com',
        password:'dasd45a46',
        country:'United States',
        city:'California',
        logo:"https://www.insights.la/wp-content/uploads/2015/04/Microsoft-logo-m-box-880x660.png",
        description:'A software company',
        speciality: 'OS & Software',
        size: '+50000',
        foundation: '1970-10-25',
        web_site: 'microsoft.com',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3AA4-8T2uRR_YJz_DiXblfr__O24YkP8T6JG2YqqhExukbyGERTNKZLf43tBKvtJsaQ8&usqp=CAU',
    }

    return (
        <div className={styles.pageContainer}>
            <Navbar></Navbar>
            <div className={styles.profileContainer}>
                <div className={styles.bannerProfileContainer}>
                    <img id={styles.banner} alt="banner" src={user.banner}></img>
                </div>
                <div className={styles.infoProfileContainer}>
                    <div className={styles.logoNameContainer}>
                        <img id={styles.logo} src={user.logo} alt="profile_pic"></img>
                        <div className={styles.nameContainer}>
                        <h1>{user.name}</h1>
                        <h5>{user.speciality}</h5>
                        <label>Since {user.foundation.slice(0,4)}</label>
                        </div>
                    </div>
                    <div className={styles.smallInfoContainer}>
                        <div className={styles.labelContainer}>
                        <img src={location} className={styles.infoAsset}></img>
                        <label>{`${user.country}, ${user.city}`}</label>
                        </div>
                        <div className={styles.labelContainer}>
                        <img src={size} className={styles.infoAsset}></img>
                        <label>{user.size}</label>
                        </div>
                        <div className={styles.labelContainer}>
                        <img src={web} className={styles.infoAsset}></img>
                        <a target="_blank" href={user.web_site.slice()}>WebSite</a>
                        </div>
                    </div>
                </div>
                <div className={styles.technologiesContainer}>
                    <h3>Technologies used at {user.name}</h3>
                </div>
                <div className={styles.descriptionContainer}>
                    <h3>Description</h3>
                    <p>{user.description}</p>
                </div>
                <div className={styles.jobsContainer}>
                    <h3>Current offers</h3>
                </div>
            </div>
        </div>
    );
}

export default ComProfile;