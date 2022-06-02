import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCompany } from "../../../../redux/company/company";
import { fetchJobDetail } from "../../../../redux/jobs/jobDetail";
import { NotFound } from "../../../not_found/NotFound";
import styles from "../../User/Post/PostDetail/PostDetail.module.css";
import arrow from "../../../../assets/arrow.png";
import { IoCreateOutline } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";
import { Edit } from "./EditJobOffer/Edit";
import { modalActions } from "../../../../redux/modal_slice/modalSlice";

function PostJobOffer() {
  const { id } = useParams();
  let dispatch = useDispatch();
  let company = useSelector((state) => state.company.company);
  const [visible, setIsVisible] = React.useState(false);

  setTimeout(function () {
    setIsVisible(true);
  }, 3000);
  const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
  console.log(id);

  useEffect(() => {
    dispatch(fetchJobDetail(id));
    dispatch(fetchCompany(userLocalStorage.id));
  }, [dispatch, id]);

  const handleEditOffer = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateEdit(true));
  };

  let renderJob = company.jobs?.find((e) => e.id == id);
  console.log(renderJob);
  return (
    <div>
      {renderJob ? (
        <>
          <div className={styles.back}>
            <Link to={"/company"}>
              <img alt="arrowBack" src={arrow}></img>
            </Link>
            <Edit />
          </div>
          <h2 id={styles.position}>{renderJob.position}</h2>
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
                  {t.name}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>
              <IoCreateOutline />
            </button>
            <button className={styles.button}>
              <CgCloseO />
            </button>
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
