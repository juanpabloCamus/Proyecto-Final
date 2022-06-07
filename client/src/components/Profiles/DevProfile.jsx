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


import { MdLocationOn } from 'react-icons/md'
import {MdEmail} from 'react-icons/md'
import {MdWork} from 'react-icons/md'
import Loading from "../Loading/Loading";

function DevProfile() {
    
    const dispatch = useDispatch()
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(fetchUser(id))
    }, [dispatch, id])

    const user = useSelector(state => state.users.user[0])
    
    if(user === undefined) return <Loading></Loading>

    let userTechs = user.technologies?.map(t => t.name)

    function handleEditExp(){
        dispatch(modalActions.setModalValue());
        dispatch(modalActions.activateEditDevExp(true));
    }

    function handleEditEdu(){
        dispatch(modalActions.setModalValue());
        dispatch(modalActions.activateEditDevEdu(true));
    }
    const sessionStorage = JSON.parse(localStorage.getItem("userData"));
    const profileType=sessionStorage.profileType
    
    return (
        <div>
          { profileType=="develop"
          ?
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
                        <div className={styles.userPhoto}>
                            <Image
                            id={styles.logo}
                            cloudName="dhar2oawa"
                            publicId={user.profile_pic}
                            // width="100"
                            // crop="scale"
                            />

                        </div>
                        <div className={styles.nameContainer}>
                            <h2>{user.fullName}</h2>
                            {user.seniority === 'Not specified' ? null : <h4>{user.seniority}</h4>}
                            <h5>{user.stack}</h5>
                            <div className={styles.nameContainer_item}>
                                <MdWork />
                                <label>{user.currentJob}</label>
                            </div>
                            <div className={styles.nameContainer_item}>
                                <MdEmail/>
                                <label>{user.email}</label>
                            </div>
                            <div className={styles.nameContainer_item}>
                                {user.country !== null && user.city !== null ? <MdLocationOn/> : <div></div>}
                                <label>{user.country !== null && user.city !== null ? `${user.city}, ${user.country}` : ""}</label>
                            </div>
                        </div>
                        <div className={styles.editProfileButtonContainer}>
                            <Link to = {`/editdevprofile/${id}`}>Edit Profile</Link>
                        </div>    
                    </div>


                    <div className={styles.secondaryInfo}>
         
                        <div className={styles.technologiesContainer}>
                            <h3>Tecnologies</h3>
                            {userTechs?.length === 0 ? <p>You can add your techs here, please complete profile</p> :
                            <div>
                            <h3>Skills at</h3>
                            <div className={styles.userTechsContainer}>
                            {userTechs?.map(t => t ==='Cplus' ?
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
                            <h3>About</h3>
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

            

        </div>
    :(
        <div className={styles.pageContainer}>
       
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
                    <div className={styles.userPhoto}>
                        <Image
                        id={styles.logo}
                        cloudName="dhar2oawa"
                        publicId={user.profile_pic}
                        // width="100"
                        // crop="scale"
                        />

                    </div>
                    <div className={styles.nameContainer}>
                        <h2>{user.fullName}</h2>
                        {user.seniority === 'Not specified' ? null : <h4>{user.seniority}</h4>}
                        <h5>{user.stack}</h5>
                        <div className={styles.nameContainer_item}>
                            <MdWork />
                            <label>{user.currentJob}</label>
                        </div>
                        <div className={styles.nameContainer_item}>
                            <MdEmail/>
                            <label>{user.email}</label>
                        </div>
                        <div className={styles.nameContainer_item}>
                            {user.country !== null && user.city !== null ? <MdLocationOn/> : <div></div>}
                            <label>{user.country !== null && user.city !== null ? `${user.city}, ${user.country}` : ""}</label>
                        </div>
                    </div>
                     
                </div>


                <div className={styles.secondaryInfo}>
     
                    <div className={styles.technologiesContainer}>
                        <h3>Tecnologies</h3>
                        {userTechs?.length === 0 ? <p>You can add your techs here, please complete profile</p> :
                        <div>
                        <h3>Skills at</h3>
                        <div className={styles.userTechsContainer}>
                        {userTechs?.map(t => t ==='Cplus' ?
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
                        <h3>About</h3>
                        {user.description === null ? <p>Not description yet? Please complete your profile</p> :
                        <p>{user.description}</p>
                        }
                    </div>
                    <div className={styles.experienceContainer}>
                        <h3>Experience</h3>
                      
                    </div>
                    <div className={styles.educationContainer}>
                        <h3>Education</h3>
                      
                    </div>
                </div>
                
            </div>
        </div>

        

    </div>

                        )}
        </div>
    );
}

export default DevProfile;