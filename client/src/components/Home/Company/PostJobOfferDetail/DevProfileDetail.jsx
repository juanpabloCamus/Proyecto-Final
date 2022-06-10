import { CloudinaryContext } from "cloudinary-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchJobDetail } from "../../../../redux/jobs/jobDetail";
import { modalActions } from '../../../../redux/modal_slice/modalSlice'
import styles from "./PostJobOfferDetail.module.css";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
//import Meeting from "../../../Meeting/Meeting";
//import { Redirect } from "react-router"
import { MeetingModal } from "../../Company/ArrangeMeeting/MeetingModal"

function DevProfileDetail() {
  let { id_job, id_dev } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

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
                className={styles.imgU}
                //width="10"
                //crop="scale"
              />
            </div>
            <div>
              {/* <Navigate to={`company/user/${id_dev}`}> */}
              <button
                onClick={() => navigate(`/company/user/${id_dev}`)}
                className={styles.buttonU}
              >
                More Info
              </button>
              {/* </Navigate> */}
            </div>
          </div>

          <div className={styles.container2}>
            <div className={styles.container3}>
              <div className={styles.container4}>
                <div className={styles.container5}>
                  <h3>{filterUser[0].user_account.fullName}</h3>
                </div>
                <div className={styles.container6}> 
                  <h4>Description:</h4>
                  <h4>{filterUser[0].description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, eius tenetur? Fugit repellat dolore ipsam sint adipisci molestiae vero asperiores architecto dolorem minima eos, quisquam accusantium error suscipit placeat reiciendis.</h4>
                </div>
              </div>

              <div className={styles.container7}>
                <a
                  className={styles.a}
                  href={`https://res.cloudinary.com/dhar2oawa/image/upload/fl_attachment:elbarto/${filterUser[0]?.pdf}.pdf`}
                  target="_blank"
                >
                  <button className={styles.buttonU}>Download PDF</button>
                </a>
              </div>
            </div>

            <div>
              <button onClick={handleOpenModal}>
                <span>Arrange Meeting</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DevProfileDetail;
