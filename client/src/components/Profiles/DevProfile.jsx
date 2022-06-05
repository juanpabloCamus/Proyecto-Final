import React, { useEffect } from "react";
import styles from './DevProfile.module.css';
import { Navbar } from "../navbar/Navbar";
import location from '../../assets/location.png';
import size from '../../assets/size.png';
import web from '../../assets/website.png';
import { fetchUser } from "../../redux/users/users";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Image } from 'cloudinary-react';
import { modalActions } from "../../redux/modal_slice/modalSlice";
import { EditDev } from './EditDev'


function DevProfile() {
    
    const dispatch = useDispatch()
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(fetchUser(id))
    }, [dispatch, id])

    const user = useSelector(state => state.users.user[0])
    
    if(user === undefined) return <h1>Loading...</h1>

    let userTechs = user.technologies.map(t => t.name)

    function handleEditExp(){
        dispatch(modalActions.setModalValue());
        dispatch(modalActions.activateEditDevExp(true));
    }

    function handleEditEdu(){
        dispatch(modalActions.setModalValue());
        dispatch(modalActions.activateEditDevEdu(true));
    }

    return (
        <div className={styles.pageContainer}>
            <EditDev/>
            {/* <EditDevEdu/> */}
            <div className={styles.profileContainer}>
                <div className={styles.bannerProfileContainer}>
                    {/* <img id={styles.banner} alt="banner" src={user.banner}></img> */}
                    <Image
                        cloudName="dhar2oawa"
                        publicId={user.banner}
                        id={styles.banner}
                        //width="100"
                        //crop="scale"
                        />
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.mainInfoContainer}>
                        {/* <img id={styles.logo} src={user.profile_pic} alt="profile_pic"></img> */}
                        <Image
                        id={styles.logo}
                        cloudName="dhar2oawa"
                        publicId={user.profile_pic}
                        // width="100"
                        // crop="scale"
                        />
                        <div className={styles.nameContainer}>
                            <h1>{user.fullName}</h1>
                            {user.seniority === 'Not specified' ? null : <h4>{user.seniority}</h4>}
                            <h5>{user.stack}</h5>
                            <label>{user.currentJob}</label>
                        </div>
                    </div>
                    <div className={styles.editProfileButtonContainer}>
                        <Link to = {`/editdevprofile/${id}`}>Edit Profile</Link>
                    </div>
                    {user.country === null ? null :
                    <div>
                        <img alt="location" src={location} className={styles.infoAsset}></img>
                        <label>{`${user.country}, ${user.city}`}</label>
                    </div> }
                    <div className={styles.technologiesContainer}>
                        {userTechs.length === 0 ? <h3>You can add your techs here, please complete profile</h3> :
                        <div>
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
                        }
                    </div>
                    {user.english_level === 'Not specified' ? <label></label> : <label>English level: {user.english_level}</label>}
                    <div className={styles.descriptionContainer}>
                        <h3>Description</h3>
                        {user.description === null ? <p>Not description yet? Please complete your profile</p> :
                        <p>{user.description}</p>
                        }
                    </div>
                    <div onClick={handleEditExp} className={styles.experienceContainer}>
                        <h3>Experience</h3>
                        <button>Add experience</button>
                    </div>
                    <div onClick={handleEditEdu} className={styles.educationContainer}>
                        <h3>Education</h3>
                        <button>Add education</button>
                    </div>
                </div>
            </div>

            

        </div>
    );
}

export default DevProfile;