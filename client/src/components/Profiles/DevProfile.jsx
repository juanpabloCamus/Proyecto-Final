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


function DevProfile() {
    
    const dispatch = useDispatch()
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(fetchUser(id))
    }, [dispatch, id])

    const user = useSelector(state => state.users.user[0])
    console.log(user)
    
    if(user === undefined) return <h1>Loading...</h1>

    let userTechs = user.technologies.map(t => t.name)

    return (
        <div className={styles.pageContainer}>
            {/* <div className={styles.profileContainer}>
                <div className={styles.bannerProfileContainer}>
                    <img id={styles.banner} alt="banner" src={user.banner}></img>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.mainInfoContainer}>
                        <img id={styles.logo} src={user.profile_pic} alt="profile_pic"></img>
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
                    <div className={styles.experienceContainer}>
                        <h3>Experience</h3>
                        <button>Add experience</button>
                    </div>
                    <div className={styles.educationContainer}>
                        <h3>Education</h3>
                        <button>Add education</button>
                    </div>
                </div>
            </div> */}

            <section className={styles.profile_container}>
                <div className={ styles.top_banner}></div>
                <div className={ styles.personal_information }>
                    <div className={styles.profile_photo}>
                        <img src="" alt="profile pic" />
                    </div>
                    <h3>Daniel</h3>
                    <h5>Full Stack Developer</h5>
                    <h6>City, Country</h6>
                </div>
                <div className={styles.profile_description}>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum veniam voluptate modi ipsa beatae. Aperiam obcaecati quisquam nostrum adipisci, laboriosam vero dicta libero impedit repudiandae soluta magni accusamus amet quidem.</p>
                </div>
            </section>

            <section className={styles.profile_container}>
                <h3>Education</h3>
                <div className={styles.education_box_item}>
                    <h5>Title 1</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ut.</p>
                </div>
                <div className={styles.education_box_item}>
                    <h5>Title 2</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ut.</p>
                </div>
                <div className={styles.education_box_item}>
                    <h5>Title 3</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ut.</p>
                </div>
            </section>

            <section className={styles.profile_container}>
                <div className={styles.skills}>
                    <h3>Skills</h3>
                    <h5>Technologies</h5>
                    <ul className={styles.technologies_container}>
                        <li>React JS</li>
                        <li>Node JS</li>
                        <li>Mongo DB</li>
                    </ul>
                </div>
                <div>
                    <h3>English Level</h3>
                    <p>Intermediate</p>
                </div>
            </section>

        </div>
    );
}

export default DevProfile;