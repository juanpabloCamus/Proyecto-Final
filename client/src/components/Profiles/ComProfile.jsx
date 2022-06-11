import React, { useEffect } from "react";
import styles from './ComProfile.module.css';
import { useDispatch, useSelector } from "react-redux";
import location from '../../assets/location.png';
import size from '../../assets/size.png';
import web from '../../assets/website.png';
import  { fetchCompanyProfile }  from "../../redux/Profile/profileData";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Image } from 'cloudinary-react'
import Loading from "../Loading/Loading";
import { modalActions } from "../../redux/modal_slice/modalSlice";
import { Premium } from "./CompanyPremium/Premium";
import {GiTechnoHeart} from 'react-icons/gi'
import { FaMedal } from 'react-icons/fa'
import { MdWork } from "react-icons/md";
import {HiChip} from 'react-icons/hi'
import {TiStarFullOutline} from 'react-icons/ti'
import cannot from "../../assets/cannot.png";
import Swal from "sweetalert2";


function ComProfile() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const sessionStorage = JSON.parse(localStorage.getItem("userData"));
    const profileType = sessionStorage.profileType;
    
    useEffect(()=> {
        dispatch(fetchCompanyProfile(id))
    },[dispatch, id])

  

    let user = useSelector(state => state.companyProfile.companyProfile[0])

    if(user === undefined) return <Loading></Loading>

    let companyTechs = []
    for (let i = 0; i < user.jobs.length; i++) {
        let aux = user.jobs[i].technologies
        for (let i = 0; i < aux.length; i++) {
            if(!(companyTechs.includes(aux[i].name)))companyTechs.push(aux[i].name)
        }
    }

    function handlePremium(){
        dispatch(modalActions.setModalValue());
        dispatch(modalActions.activatePremium(true));
    }

    function handlePremiumInfo(){
        Swal.fire({icon:'info',title:'Rocket Premium' ,text:`You are a premium user from ${user.premiumDate?.slice(5,10) + '-' + user.premiumDate?.slice(0,4)} to ${parseInt(user.premiumDate?.slice(6,7)) + 1}-${user.premiumDate?.slice(8,10)} ${user.premiumDate?.slice(0,4)}`})
    }

    if (profileType[0] === 'company' && sessionStorage.id !== user.id) return (
        <div className={styles.cannot}>
        <img alt="warning" src={cannot}></img>
        <h1>You can't access here</h1>
      </div>
      )
      
    return (
        <div className={styles.pageContainer}>
            <Premium></Premium>
            <div className={styles.profileContainer}>
                <div className={styles.bannerProfileContainer}>
                    <Image
                        cloudName="dhar2oawa"
                        publicId={user.banner}
                        id={styles.banner}
                        />
                </div>
                <div className={styles.infoProfileContainer}>
                    <div className={styles.logoNameContainer}>
                        <div className={styles.userPhoto}>
                            <Image
                                    id={styles.logo}
                                    cloudName="dhar2oawa"
                                    publicId={user.logo}
                                    />
                        </div>
                        <div className={styles.nameContainer}>
                        <h1>{user.name}</h1>
                        <h5>{user.speciality}</h5>
                        { user.foundation === null ? <label></label> :
                        <label>Since {user.foundation.slice(0,4)}</label>}
                        {user.premium ? <label onClick={handlePremiumInfo} id={styles.premiumLabel}>Rocket premium <TiStarFullOutline></TiStarFullOutline></label> : null}
                        </div>
                    </div>
                    <div className={styles.smallInfoContainer}>
                        <div className={styles.labelContainer}>
                            {user.country === null ? null :
                            <div>
                            <img id={styles.location} src={location} className={styles.infoAsset} alt=""></img>
                            { user.city === null ? <label>{user.country}</label> :
                                <label>{`${user.country}, ${user.city}`}</label>
                            }
                            </div>
                            }
                        </div>
                        {user.size === 'Not Specified' ? null :
                            <div className={styles.labelContainer}>
                            <img src={size} className={styles.infoAsset} alt=""></img>
                            <label>{user.size}</label>
                            </div>}
                            <div className={styles.labelContainer}>
                        {user.web_site === null ? null :
                        <div>
                            <img id={styles.web} src={web} className={styles.infoAsset} alt=""></img>
                            <a target="blank" href={user.web_site.slice()}>WebSite</a>
                        </div>
                        }
                        </div>
                    </div>
                </div>
                {profileType[0] === 'develop' ? null :
                <div className={styles.editProfileButtonContainer}>
                        <Link to = {`/editcomprofile/${id}`}>Edit Profile</Link>
                        {user.premium ? null : 
                        <button id={styles.premium} onClick={handlePremium}>Be premium <FaMedal/></button>
                        }
                </div>
                }
                {companyTechs.length === 0 ? <h3>Start adding jobs offers and complete your profile!</h3> :
                <div className={styles.technologiesContainer}>
                    <h3>Technologies used at {user.name} <GiTechnoHeart></GiTechnoHeart></h3>
                    <div className={styles.companyTechsContainer}>
                        {companyTechs.map(t => t ==='Cplus' ?
                        (<label key={t} >C+</label>) :
                        t==='Cplusplus' ?
                        (<label key={t} >C++</label>) :
                        t==='CSharp' ?
                        (<label key={t} >C#</label>) :
                        (<label key={t} >{t}</label>))}
                    </div>
                </div>
                }
                <div className={styles.descriptionContainer}>
                    <h3>Description <HiChip></HiChip></h3>
                    <p>{user.description}</p>
                </div>
                <div className={styles.jobsContainer}>
                    <h3>Current job offers at {user.name} <MdWork></MdWork></h3>
                    <div>
                        {user.jobs.map((j) => 
                            <div className={styles.jobContainer} key={j.id}>
                            <Link to={
                                profileType[0] === 'develop' ?
                                `/home/post/${id}` :
                                `/company/offers/${id}`
                                }>
                            <div className={styles.postCard}>
                                <div className={styles.imgContainer}>
                                {/* {<img id={styles.logo} src={user.logo} alt="Company logo"></img>} */}
                                <Image
                                id={styles.logo}
                                cloudName="dhar2oawa"
                                publicId={user.logo}
                                // width="100"
                                // crop="scale"
                                />
                                </div>
                                <div className={styles.detailsContainer}>
                                <h3>{j.position}</h3>
                                <div className={styles.subDetails}>
                                    <p>{j.salary_range === '10000$'? '+ 10000$': j.salary_range}</p>
                                    <p>Seniority: {j.seniority}</p>
                                    <p>Time: {j.time}</p>
                                </div>
                                </div>
                                <div className={styles.techsContainer}>
                                {j.technologies.map(t => t.name==='Cplus' ?
                                    (<label key={t.name} >C+</label>) :
                                    t.name==='Cplusplus' ?
                                    (<label key={t.name} >C++</label>) :
                                    t.name==='CSharp' ?
                                    (<label key={t.name} >C#</label>) :
                                    (<label key={t.name} >{t.name}</label>))}
                                </div>
                            </div>
                            </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComProfile;