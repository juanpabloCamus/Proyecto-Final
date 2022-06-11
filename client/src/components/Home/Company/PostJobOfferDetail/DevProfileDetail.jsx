import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchJobDetail } from "../../../../redux/jobs/jobDetail";
import { modalActions } from '../../../../redux/modal_slice/modalSlice'

import styles from "./PostJobOfferDetail.module.css";
import { Image } from "cloudinary-react";
//import Meeting from "../../../Meeting/Meeting";
import { MeetingModal } from "../../Company/ArrangeMeeting/MeetingModal"

function DevProfileDetail() {
  let { id_job, id_dev } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
console.log(useParams())
  useEffect(() => {
    dispatch(fetchJobDetail(id_job));
  }, [dispatch, id_job]);
  let jobDetail = useSelector((state) => state.jobDetail.jobDetail);
  let filterUser = jobDetail[0]?.applied_jobs?.filter(
    (e) => e.userAccountId == id_dev
  );

  const handleOpenModal = () =>{
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activateArrangeMeeting(true))
  }

  return (
    <div className={styles.pageContainerUser}>
      <MeetingModal/>
      {filterUser ? (
        <div className={styles.containerMain}>
            <div className={styles.container1}>
                <div className={styles.user_icon}>
                  <Image
                    cloudName="dhar2oawa"
                    publicId={filterUser[0].user_account.profile_pic}
            
                  />
                </div>

                <div className={styles.container2}> 
                  <h3>{filterUser[0].user_account.fullName}</h3>
                  <div className={styles.container6}> 
                    <h4>Description:</h4>
                    <p>{filterUser[0].description} </p>
                  </div>
                </div>
            </div>

            <div className={styles.dev_profile_buttons}>
                
                      <a
                        className={styles.buttonU}
                        href={`https://res.cloudinary.com/dhar2oawa/image/upload/fl_attachment:elbarto/${filterUser[0]?.pdf}.pdf`}
                        target="_blank"
                      >
                        Download PDF
                      </a>

                    <button
                      onClick={() => navigate(`/company/user/${id_dev}`)}
                      className={styles.buttonU}
                    >
                      More Info
                    </button>
                 
                    <button onClick={handleOpenModal} className={`${styles.buttonU} ${styles.buttonU_1}`}>Arrange Meeting</button>
                  
            </div>

        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DevProfileDetail;
