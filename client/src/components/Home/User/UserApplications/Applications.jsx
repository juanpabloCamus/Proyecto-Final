import React, { useEffect } from "react";
import styles from './Applications.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchUser } from "../../../../redux/users/users";
import cannot from '../../../../assets/cannot.png'
import Loading from "../../../Loading/Loading";
import { Image } from 'cloudinary-react';
import { Link } from "react-router-dom";

function Applications() {

    const sessionStorage = JSON.parse(localStorage.getItem("userData"));
    const profileType = sessionStorage.profileType;
    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch, id]);

    const user = useSelector((state) => state.users.user[0]);
    if(user === undefined) return <Loading></Loading>
    const { applied_jobs } = user 
    
    return (
        <div className={styles.pageContainer}>
        <h2 className={styles.titlePage}>Your<span> History</span> in Rocket</h2>
        {applied_jobs.length === 0 ? <label className={styles.errorLabel}>You haven't applied for any job yet. What are you waiting for to get your dream job?</label> :
        <div className={styles.appContainer}>
        <label className={styles.appLabel}>My applications</label>
        {applied_jobs.map((j) => 
            <div  key={j.createdAt} className={styles.allInfo}>
            <label className={styles.date}>{j.createdAt.slice(0,10)}</label>
            {!j.job.active ? <label className={styles.msg}>Oops..You applied this day but job is no longer available</label> : <Link to={`/home/post/${j.job.id}`}>
            <div className={styles.postCard}>
                <div className={styles.imgContainer}>
                <Image
                    cloudName="dhar2oawa"
                    publicId={j.job.company_accounts[0].logo}
                    id={styles.logo}
                    //width="100"
                    //crop="scale"
                    />
                </div>
                <div className={styles.detailsContainer}>
                <h2>{j.job.company_accounts[0].name}</h2>
                <h3>{j.job.position}</h3>
                <div className={styles.subDetails}>
                    <p>{j.job.salary_range === '10000$'? '+ 10000$': j.job.salary_range}</p>
                    <p>Seniority: {j.job.seniority}</p>
                    <p>Time: {j.job.time}</p>
                </div>
                </div>
                <div className={styles.techsContainer}>
                {j.job.technologies.map(t => t.name==='Cplus' ?
                    (<label key={t.id} >C+</label>) :
                    t.name==='Cplusplus' ?
                    (<label key={t.id} >C++</label>) :
                    t.name==='CSharp' ?
                    (<label key={t.id} >C#</label>) :
                    (<label key={t.id} >{t.name}</label>))}
                </div>
            </div>
            </Link>
            }
            {!j.job.active ? null :
            <p className={styles.msg}>Message: {j.description}</p>
            }
            </div>
        )}
        </div>
        }
        </div>
    );
}

export default Applications;