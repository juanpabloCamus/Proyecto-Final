import { Link, useParams } from "react-router-dom";
import arrow from '../../../../../assets/arrow.png';
import heart from '../../../../../assets/heart.png';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetail } from "../../../../../redux/jobs/jobDetail";
import styles from './PostDetail.module.css';

function PostDetail() {

    const {id} = useParams();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchJobDetail(id))
    },[dispatch,id])

    let detail = useSelector((state)=> state.jobDetail.jobDetail);
    let {position,salary_range,time,requirements,company_accounts,technologies,seniority,english_level,description} = detail[0]
    
    return (
        <div className={styles.pageContainer}>
            <div className={styles.back}>
            <Link to={'/home'}>
                <img alt="arrowBack" src={arrow}></img>
            </Link>
            </div>
            <div className={styles.detailContainer}>
                <div className={styles.detailOne}>
                    <h2 id={styles.position}>{position}</h2>
                    <div className={styles.fields}>
                        <h4>Rango de salario: </h4>
                        <label>{salary_range}</label>
                    </div>
                    <div className={styles.fields}>
                        <h4>Tiempo: </h4>
                        <label>{time}</label>
                    </div>
                    <div className={styles.fields}>
                        <h4>Seniority: </h4>
                        <label>{seniority}</label>
                    </div>
                    <div className={styles.fields}>
                        <h4>Nivel de Ingles: </h4>
                        <label>{english_level}</label>
                    </div>
                </div>
                <div className={styles.detailTwo}>
                    <div id={styles.description} className={styles.fields}>
                        <h4>Descripcion</h4>
                        <label>{description}</label>
                    </div>
                    <div id={styles.requirements} className={styles.fields}>
                        <h4>Requerimientos</h4>
                        <label>{requirements}</label>
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>Aplicar</button>
                <button className={styles.button}><img id={styles.heart} src={heart}></img></button>
            </div>
        </div>
    );
}

export default PostDetail;