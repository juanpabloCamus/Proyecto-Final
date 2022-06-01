import React, { useEffect } from "react";
import styles from './DevProfile.module.css';
import { Navbar } from "../navbar/Navbar";
import location from '../../assets/location.png';
import size from '../../assets/size.png';
import web from '../../assets/website.png';
import { fetchUser } from "../../redux/users/users";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

function DevProfile() {
    
    const dispatch = useDispatch()
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(fetchUser(id))
    }, [dispatch, id])

    const user = useSelector(state => state.users.user[0])
    console.log(user);
    if(user === undefined) return <h1>Loading...</h1>

    let userTechs = user.technologies.map(t => t.name)
    
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
                        <div className={styles.userTechsContainer}>
                        {userTechs.map(t => t ==='Cplus' ?
                        (<label key={t} >C+</label>) :
                        t==='Cplusplus' ?
                        (<label key={t} >C++</label>) :
                        t==='CSharp' ?
                        (<label key={t} >C#</label>) :
                        (<label key={t} >{t}</label>))}
                        </div>
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