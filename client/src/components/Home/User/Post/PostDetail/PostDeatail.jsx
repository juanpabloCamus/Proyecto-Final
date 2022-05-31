import { Link, useParams } from "react-router-dom";
import arrow from '../../../../../assets/arrow.png';
import selectedHeart from '../../../../../assets/heart.png';
import heart from '../../../../../assets/heart2.png';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetail } from "../../../../../redux/jobs/jobDetail";
import styles from './PostDetail.module.css';
import axios from 'axios'
function PostDetail() {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [ state, setState] = useState(true)
    const jobs = useSelector((state) => state.jobs.jobsDetail);
 
    console.log(jobs)
    const userLocalStorage=JSON.parse(localStorage.getItem("user"))

    let idUser = userLocalStorage.id
    console.log(idUser)

    let idJob = id
    console.log(idJob)

    const handleFavorite = async (e) => {

        if(state === true) {setState(false)
        }else setState(true)
        console.log(state)
        try {
            console.log(state)
            const fav = await axios.post(`http://localhost:3001/users/${idUser}/favs/${idJob}`, {state})
            console.log(fav)

        } catch (error) {
            console.log(error)
        }

         };
    
    useEffect(()=>{
        dispatch(fetchJobDetail(id))
    },[dispatch,id])

    let detail = useSelector((state)=> state.jobDetail.jobDetail);
    if (detail[0] === undefined) return(<h1>Loading...</h1>)
    let {position,salary_range,time,requirements,company_accounts,technologies,seniority,english_level,description} = detail[0]
    if (company_accounts === undefined) return(<h1>Loading...</h1>)
    return (
        <div className={styles.pageContainer}>  
            <div className={styles.back}>
            <Link to={'/home'}>
                <img alt="arrowBack" src={arrow}></img>
            </Link>
            
            </div>
            <div className={styles.companyInfoContainer}>
                <div className={styles.logoContainer}>
                <img id={styles.logo} src={company_accounts[0].logo} alt=''></img>
            </div>
            <div className={styles.nameContainer}>
                <h1>{company_accounts[0].name}</h1>
                <h5>{company_accounts[0].speciality}</h5>
            </div>
            </div>
            <div className={styles.detailContainer}>
                <div className={styles.detailOne}>
                    <h2 id={styles.position}>{position}</h2>
                    <div className={styles.fields}>
                        <h4>Salary Range: </h4>
                        <label>{salary_range}</label>
                    </div>
                    <div className={styles.fields}>
                        <h4>Time: </h4>
                        <label>{time}</label>
                    </div>
                    <div className={styles.fields}>
                        <h4>Seniority: </h4>
                        <label>{seniority}</label>
                    </div>
                    <div className={styles.fields}>
                        <h4>English Level: </h4>
                        <label>{english_level}</label>
                    </div>
                </div>
                <div className={styles.detailTwo}>
                    <div id={styles.description} className={styles.fields}>
                        <h4>Description</h4>
                        <label>{description}</label>
                    </div>
                    <div id={styles.requirements} className={styles.fields}>
                        <h4>Requirements</h4>
                        <label>{requirements}</label>
                    </div>
                </div>
            </div>
            <div className={styles.techsDetailContainer}>
                <h4>Technologies Required</h4>
                <div className={styles.techContainer}>
                {technologies.map(t => (<label className={styles.tech} key={t.id} >{t.name}</label>))}
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>Apply now</button>
                <button className={styles.button} onClick={(e)=> handleFavorite(e)}>
                    { !state ?
                        <img id={styles.heart} src={selectedHeart}></img>
                        :
                        <img id={styles.heart} src={heart}></img>}
                    </button>
            </div>
        </div>
    );
}

export default PostDetail;