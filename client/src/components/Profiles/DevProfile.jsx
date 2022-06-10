import React, { useEffect } from "react";
import styles from "./DevProfile.module.css";
import { Navbar } from "../navbar/Navbar";
import location from "../../assets/location.png";
import size from "../../assets/size.png";
import cannot from "../../assets/cannot.png";
import { fetchUser } from "../../redux/users/users";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { modalActions } from "../../redux/modal_slice/modalSlice";
import { EditDev } from "./EditDev";
import { MdReportGmailerrorred } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdWork } from "react-icons/md";
import Loading from "../Loading/Loading";
import axios from "axios"
import Swal from "sweetalert2";
import {FaUserGraduate} from 'react-icons/fa'
import { MdPerson } from "react-icons/md";
import {GiTechnoHeart} from 'react-icons/gi'
import {MdDeleteOutline} from 'react-icons/md'
import {MeetingModal} from '../Home/Company/ArrangeMeeting/MeetingModal'

function DevProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);
  
  const user = useSelector((state) => state.users.user[0]);
  const sessionStorage = JSON.parse(localStorage.getItem("userData"));
  const profileType = sessionStorage.profileType;
  const idCom=sessionStorage.id
  if (user === undefined) return <Loading></Loading>;

  let userTechs = user.technologies?.map((t) => t.name);

  function handleEditExp() {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateEditDevExp(true));
  }

  function handleEditEdu() {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateEditDevEdu(true));
  }

  const handleOpenModal = () =>{
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activateArrangeMeeting(true))
  }

  async function handleDelete(e){

    if (e.target.name === 'exp'){

      const res = await Swal.fire({
        text:'Are you sure you want to delete this?',
        showCancelButton: true,
      });

      if (res.isConfirmed) {
        try {
          await axios.delete(`users/experience/${e.target.value}`)
          dispatch(fetchUser(id))
        } catch (error) {
          Swal.fire({icon:"error",text:`${error.response.data}`})
        }
      }
    }

    if (e.target.name === 'edu'){

      const res = await Swal.fire({
        text:'Are you sure you want to delete this?',
        showCancelButton: true,
      });

      if (res.isConfirmed) {
      try {
        await axios.delete(`users/education/${e.target.value}`)
        dispatch(fetchUser(id))
      } catch (error) {
        Swal.fire({icon:"error",text:`${error.response.data}`})
      }
    }
    }
  }

  const  handleReport=async (id)=>{

    try{
      const res = await Swal.fire({
        input: 'select',
           inputOptions: {
          'spam': 'Spam',
          'inappropiate lenguaje': 'Inappropiate Lenguaje',
          'false information': 'False Information',
          'inappropriate content':'Inappropriate Content'

           },
       inputPlaceholder: 'Select reports',
       showCancelButton: true,

     })

      if (res.isConfirmed) {
        await axios.put(`users/report/${id}`, res.value, idCom, profileType);
      }
    }catch(error)
    {
       console.log(error)
    }
  }

  if (profileType[0] === 'develop' && sessionStorage.id !== user.id) return (
    <div className={styles.cannot}>
    <img alt="warning" src={cannot}></img>
    <h1>You can't access here</h1>
  </div>
  )
  
  return (
    <div>
      <div className={styles.pageContainer}>
        <EditDev />
        <MeetingModal/>
        <div className={styles.profileContainer}>
          <div className={styles.bannerProfileContainer}>
            <Image
              cloudName="dhar2oawa"
              publicId={user.banner}
              id={styles.banner}
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.reportaje}>
              {profileType == "company" && (
                <button onClick={() => handleReport(id)}>
                  <MdReportGmailerrorred />
                </button>
              )}
            </div>
            <div className={styles.mainInfoContainer}>

              <div className={styles.mainInfoBox}>

                    <div className={styles.userPhoto}>
                      <Image
                        id={styles.logo}
                        cloudName="dhar2oawa"
                        publicId={user.profile_pic}
                
                      />
                    </div>
                    <div className={styles.nameContainer}>
                      <h2>{user.fullName}</h2>
                      {user.seniority === "Not specified" ? null : (
                        <h4>{user.seniority}</h4>
                      )}
                      <label>{user.stack}</label>
                      <div className={styles.nameContainer_item}>
                        <MdWork />
                        <label>{user.currentJob}</label>
                      </div>
                      <div className={styles.nameContainer_item}>
                        <MdEmail />
                        <label>{user.email}</label>
                      </div>
                      <div className={styles.nameContainer_item}>
                        {user.country !== null && user.city !== null ? (
                          <MdLocationOn />
                        ) : (
                          <div></div>
                        )}
                        <label>
                          {user.country !== null && user.city !== null
                            ? `${user.city}, ${user.country}`
                            : ""}
                        </label>
                      </div>
                    </div>

              </div>
              
              {profileType == "develop"? (
                <div className={styles.editProfileButtonContainer}>
                  <Link to={`/editdevprofile/${id}`}>Edit Profile</Link>
                </div>
              ) : (
                <div className={styles.editProfileButtonContainer}>
                  <button onClick={handleOpenModal}>Arrange Meeting</button>
                </div>
              )}
            </div>

            <div className={styles.secondaryInfo}>
              <div className={styles.secondaryInfoContainer}>
                <h3>Technologies <GiTechnoHeart/></h3>
                {userTechs?.length === 0 ? (
                  <p>You can add your techs here, please complete profile</p>
                ) : (
                  <div>
                    <div className={styles.userTechsContainer}>
                      {userTechs?.map((t) =>
                        t === "Cplus" ? (
                          <label key={t}>C+</label>
                        ) : t === "Cplusplus" ? (
                          <label key={t}>C++</label>
                        ) : t === "CSharp" ? (
                          <label key={t}>C#</label>
                        ) : (
                          <label key={t}>{t}</label>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
              {user.english_level === "Not specified" ? (
                <label></label>
              ) : (
                <label>English level: {user.english_level}</label>
              )}
              <div className={styles.secondaryInfoContainer}>
                <h3 className={styles.about}>About <MdPerson/></h3>
                {user.description === null ? (
                  <p>Not description yet? Please complete your profile</p>
                ) : (
                  <p>{user.description}</p>
                )}
              </div>
              <div
                className={styles.secondaryInfoContainer}
              >
                <h3>Experience <MdWork/></h3>
                {user.experiences?.length > 0 ?  
                  
                  user.experiences.map((e) => 
                    <div className={styles.secondaryInfoCards} key={e.id}>
                      <div id={styles.high} className={styles.dateContainer}>
                        <div className={styles.dateContainer}>
                        <label>{e.start_date}</label> 
                        {e.end_date === '1800-12-12' ? <label>Present</label>
                        : <label>{e.end_date}</label>
                        }
                        </div>
                        <button name="exp" value={e.id} onClick={handleDelete} className={styles.delete}><MdDeleteOutline/></button>
                      </div>
                      <h2 className={styles.props}>{e.company}</h2>
                      <h3 id={styles.deg} className={styles.props}>{e.position}</h3>
                      <p className={styles.dsc}>{e.description}</p>
                    </div>
                  )

                : null}
                {profileType == "develop" && <button onClick={handleEditExp}>Add experience</button>}
              </div>
              <div
                className={styles.secondaryInfoContainer}
              >
                <h3>Education <FaUserGraduate/></h3>
                {user.education?.length > 0 ?  
                  
                  user.education.map((e) => 
                    <div className={styles.secondaryInfoCards} key={e.id}>
                      <div id={styles.high} className={styles.dateContainer}>
                        <div className={styles.dateContainer}>
                        <label>{e.start_date}</label> 
                        {e.end_date === '1800-12-12' ? <label>Present</label>
                        : <label>{e.end_date}</label>
                        }
                        </div>
                        <button name="edu" value={e.id} onClick={handleDelete} className={styles.delete}><MdDeleteOutline/></button>
                      </div>
                      <h2 className={styles.props}>{e.institution}</h2>
                      <h3 id={styles.deg} className={styles.props}>{e.degree}</h3>
                      <p className={styles.dsc}>{e.description}</p>
                    </div>
                  )

                : null}
                {profileType == "develop" && <button onClick={handleEditEdu}>Add education</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevProfile;