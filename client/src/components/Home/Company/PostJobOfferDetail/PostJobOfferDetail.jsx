import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchCompany } from "../../../../redux/company/company";
import { fetchJobDetail } from "../../../../redux/jobs/jobDetail";
import { NotFound } from "../../../not_found/NotFound";
import styles from "../PostJobOfferDetail/PostJobOfferDetail.module.css";
import arrow from "../../../../assets/arrow.png";
import { BiHide } from "react-icons/bi";
import { GrFormView, GrView } from "react-icons/gr";
import { FaEye } from "react-icons/fa"
import { IoCreateOutline } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";
import { BsInfoCircle } from "react-icons/bs";
import { modalActions } from "../../../../redux/modal_slice/modalSlice";
import { Edit } from "./EditJobOffer/Edit";

function PostJobOffer() {
  const { id } = useParams();
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let company = useSelector((state) => state.company.company);
  const [visible, setIsVisible] = React.useState(false);

  setTimeout(function () {
    setIsVisible(true);
  }, 3000);
  const userLocalStorage = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    // console.log('aqui')
    // console.log(id)
    dispatch(fetchJobDetail(id));
    dispatch(fetchCompany(userLocalStorage.id));
  }, [dispatch, id]);

  const handleEditOffer = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateEdit(true));
    dispatch(modalActions.activateDelete(false))
  };

  const handleDelete = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateDelete(true));
    dispatch(modalActions.activateEdit(false))
  };
  let renderJob = company.jobs?.filter((e) => e.id == id)[0];

  return (
    <div className={styles.pageContainer}>
      <Edit />
      {renderJob ? (
        <>
          <div className={styles.back}>
            <button onClick={() => navigate(-1)}>
              <img alt="arrowBack" src={arrow}></img>
            </button>
          </div>
          <div className={styles.companyInfoContainer}>
            <h2 id={styles.position}>{renderJob.position}</h2>
          </div>
          <div className={styles.detailContainer}>
            <div className={styles.detailOne}>
              <div className={styles.fields}>
                <h4>Salary Range: </h4>
                <label>{renderJob.salary_range}</label>
              </div>
              <div className={styles.fields}>
                <h4>Time: </h4>
                <label>{renderJob.time}</label>
              </div>
              <div className={styles.fields}>
                <h4>Seniority: </h4>
                <label>{renderJob.seniority}</label>
              </div>
              <div className={styles.fields}>
                <h4>English Level: </h4>
                <label>{renderJob.english_level}</label>
              </div>
            </div>
            <div className={styles.detailTwo}>
              <div id={styles.description} className={styles.fields}>
                <h4>Description:</h4>
                <label>{renderJob.description}</label>
              </div>
              <div id={styles.requirements} className={styles.fields}>
                <h4>Requirements:</h4>
                <label>{renderJob.requirements}</label>
              </div>
            </div>
          </div>
          <div className={styles.techsDetailContainer}>
            <h4>Technologies Required:</h4>
            <div className={styles.techContainer}>
              {renderJob.technologies.map((t) => (
                <label className={styles.tech} key={t.id}>
                  {t.name === "Cplus" || t.tech === "Cplus" ? (
                    <p>C+</p>
                  ) : t.name === "Cplusplus" || t.tech === "Cplusplus" ? (
                    <p>C++</p>
                  ) : t.name === "CSharp" || t.tech === "CSharp" ? (
                    <p>C#</p>
                  ) : (
                    <p>{t.name || t.tech}</p>
                  )}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div>
              <button onClick={handleEditOffer} className={styles.button}>
                <IoCreateOutline />
              </button>
              <span className={styles.field}>
                <BsInfoCircle />
                <span className={styles.quote}>Edit your post offer.</span>
              </span>
            </div>

            {renderJob.active && (
              <div>
                <button onClick={handleDelete} className={styles.button}>
                  <BiHide />
                </button>
                <span className={styles.field}>
                <BsInfoCircle />
                <span className={styles.quote}>Disable your post offer.</span>
                </span>
              </div>
            )}
            {!renderJob.active && (
              <div>
                <button className={styles.button1}>
                  <FaEye />
                </button>
                <span className={styles.field}>
                <BsInfoCircle />
                <span className={styles.quote}>Show your post offer.</span>
                </span>
              </div>
            )}
          </div>
        </>
      ) : !visible ? (
        <h1>Loading...</h1>
      ) : (
        <NotFound />
      )}
      
    </div>
  );
}

export default PostJobOffer;