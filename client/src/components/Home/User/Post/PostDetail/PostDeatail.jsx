import { Link, useParams,useNavigate } from "react-router-dom";
import arrow from '../../../../../assets/arrow.png';
import cannot from '../../../../../assets/cannot.png';
import selectedHeart from '../../../../../assets/heart.png';
import heart from '../../../../../assets/heart2.png';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetail } from "../../../../../redux/jobs/jobDetail";
import { modalActions } from '../../../../../redux/modal_slice/modalSlice';
import  {ApplyModal}  from '../../Apply/ApplyModal';
import {MdReportGmailerrorred} from "react-icons/md"
import styles from './PostDetail.module.css';
import axios from 'axios'
import { Image } from 'cloudinary-react';
import Loading from "../../../../Loading/Loading";

function PostDetail() {

  let navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    //redux para abir y cerrar react portal
    const { isOpen } = useSelector(state => state.modal)

    const [state, setState] = useState(true)
    const [check,setCheck] = useState(true)

  const userLocalStorage = JSON.parse(localStorage.getItem("userData"));

  let idUser = userLocalStorage.id;

  let idJob = id;


  useEffect(() => {
    dispatch(fetchJobDetail(id));
  }, [dispatch, id]);

   const  handleReport=async (id)=>{

    try{

       const res=await axios.put(`jobs/report/${id}`)

    }catch(error)
    {
      console.log(error)
    }
  }
  let detail = useSelector((state) => state.jobDetail.jobDetail);

  if (detail[0]) {
    var {
      position,
      salary_range,
      time,
      requirements,
      company_accounts,
      technologies,
      seniority,
      english_level,
      description,
      user_accounts,
    } = detail[0];
    if (user_accounts) {
      if (user_accounts.length > 0) {
        var isFav = user_accounts.find((u) => u.id === idUser);
      }
    }
  }
    var handleFavorite

    if(isFav){
        handleFavorite = async (e) => {
            if(isFav&&check){
                setCheck(false)
            }else{
                if(state === true) {setState(false)
                }else setState(true)
            }
            try {
                await axios.post(`/users/${idUser}/favs/${idJob}`, check ? {state: !state} : {state})
                } catch (error) {
                console.log(error)
            }
        };
    }else{
        handleFavorite = async (e) => {
            if(state === true) {setState(false)
            }else setState(true)
            try {
                await axios.post(`/users/${idUser}/favs/${idJob}`, {state})
            } catch (error) {
                console.log(error)
            }
        };
    }

    const handleOpenModal = () =>{
        dispatch(modalActions.setModalValue())
        dispatch(modalActions.activeApplyModal(true))
      }
    
    if(userLocalStorage.profileType[0] === "company"){
        if (company_accounts !== undefined) {
            if (company_accounts[0].id !== userLocalStorage.id) return (
                <div className={styles.cannot}>
                    <img alt='warning' src={cannot}></img>
                    <h1>You can't access here as a company</h1>
                </div>
            )
        }
    }

  return detail[0] ? (
    company_accounts ? (
      <div className={styles.pageContainer}>
      <ApplyModal/>
        <div className={styles.back}>
          <button onClick={() => navigate(-1)}>
            <img alt="arrowBack" src={arrow}></img>
          </button>
            <button onClick={()=>handleReport(id)}className={styles.reportaje}><MdReportGmailerrorred/></button>
        </div>
        <div className={styles.companyInfoContainer}>
          <div className={styles.logoContainer}>
            {/* <img id={styles.logo} src={company_accounts[0].logo} alt=""></img> */}
            <Image
              cloudName="dhar2oawa"
              publicId={company_accounts[0].logo}
              id={styles.logo}
              //width="100"
              //crop="scale"
            />
           
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
            {technologies.map((t) => (
              <label className={styles.tech} key={t.id}>
                {t.name}
              </label>
            ))}
          </div>
        </div>
        {company_accounts[0].id === userLocalStorage.id && userLocalStorage.profileType[0] === "company" ? null :
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={ handleOpenModal }>Apply now</button>
          <button className={styles.button} onClick={(e) => handleFavorite(e)}>
            {isFav ? (
              check ? (
                <img id={styles.heart} src={selectedHeart} alt=""></img>
              ) : !state ? (
                <img id={styles.heart} src={selectedHeart} alt=""></img>
              ) : (
                <img id={styles.heart} src={heart} alt=""></img>
              )
            ) : state ? (
              <img id={styles.heart} src={heart} alt=""></img>
            ) : (
              <img id={styles.heart} src={selectedHeart} alt=""></img>
            )}
          </button>
        </div>
        }
      </div>
    ) : (
      <Loading></Loading>
    )
  ) : (
    <Loading></Loading>
  );
}

export default PostDetail;
