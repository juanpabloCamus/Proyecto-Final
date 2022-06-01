import React from "react";
import styles from './DevProfile.module.css';
import { Navbar } from "../navbar/Navbar";
import location from '../../assets/location.png';
import size from '../../assets/size.png';
import web from '../../assets/website.png';

function DevProfile() {
    const user = {   
        fullName: 'Elon Musk',
        email: 'elon@millonario.com',
        password: '26465456',
        date_birth: '2022-05-10',
        profile_pic: 'https://www.trecebits.com/wp-content/uploads/2011/09/IMAGEN-DE-PERFIL-FACEBOOK.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRew7fCRwBNlC8Lz-_XHqZRF7HokVGXj2EATg&usqp=CAU',
        stack: 'Front-End Enginner',
        currentJob: 'CEO at tesla'
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.profileContainer}>
                <div className={styles.bannerProfileContainer}>
                    <img id={styles.banner} alt="banner" src={user.banner}></img>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.mainInfoContainer}>
                        <img id={styles.logo} src={user.profile_pic} alt="profile_pic"></img>
                        <div className={styles.nameContainer}>
                            <h1>{user.fullName}</h1>
                            <h5>{user.stack}</h5>
                            <label>{user.currentJob}</label>
                        </div>
                    </div>
                    <div className={styles.technologiesContainer}>
                        <h3>Skills at</h3>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <h3>Description</h3>
                        <p>{user.description}</p>
                    </div>
                    <div className={styles.experienceContainer}>
                        <h3>Experience</h3>
                        <p>Experience</p>
                    </div>
                    <div className={styles.educationContainer}>
                        <h3>Education</h3>
                        <p>Education</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DevProfile;