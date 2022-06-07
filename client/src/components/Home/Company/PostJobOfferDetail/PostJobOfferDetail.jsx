import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchCompany } from "../../../../redux/company/company";
import { fetchJobDetail } from "../../../../redux/jobs/jobDetail";
import { NotFound } from "../../../not_found/NotFound";
import styles from "../PostJobOfferDetail/PostJobOfferDetail.module.css";
import styles1 from "../Post/Post.module.css";
import arrow from "../../../../assets/arrow.png";
import { BiHide } from "react-icons/bi";
import { GrFormView, GrView } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";
import { BsInfoCircle } from "react-icons/bs";
import { modalActions } from "../../../../redux/modal_slice/modalSlice";
import { Edit } from "./EditJobOffer/Edit";
import { Image } from "cloudinary-react";
//import PostU from "../Post/Post";

function PostJobOffer() {
  const { id } = useParams();
  //console.log(id)
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let company = useSelector((state) => state.company.company);
  let jobDetail = useSelector((state) => state.jobDetail.jobDetail);
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
  console.log(
    "aqui",
    jobDetail[0]?.applied_jobs?.map((e) => e.user_account)
  );
  console.log(company);
  const handleEditOffer = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateEdit(true));
    dispatch(modalActions.activateDelete(false));
  };

  const handleDelete = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateDelete(true));
    dispatch(modalActions.activateEdit(false));
  };
  let renderJob = company.jobs?.filter((e) => e.id == id)[0];
  const radioStorage = JSON.parse(localStorage.getItem("radio1"));
  let [radio1, setRadio1] = useState(radioStorage || "edit");
  localStorage.setItem("radio1", JSON.stringify(radio1));

  function handleCircle(e) {
    let isChecked = e.target.checked;
    if (isChecked) {
      if (e.target.value === "developers") {
        setRadio1("developers");
      } else setRadio1("edit");
    }
    // if (!isChecked) {
    //   setRadio("developers")
    // }
  }

  return (
    <div>
  {radio1 === "edit" ? (    <div>
      <div className={styles.container_checkbox}>
        <div className={styles.div_checkbox_radio}>
          <input
            className={styles.checkbox}
            type="radio"
            id="edit"
            name="radio"
            value={"edit"}
            checked={radio1 === "edit"}
            onChange={(e) => handleCircle(e)}
          />
          <label className={styles.label}>Edit Detail</label>
        </div>
        <div className={styles.div_checkbox_radio}>
          <input
            className={styles.checkbox}
            type="radio"
            id="developers"
            name="radio"
            value={"developers"}
            checked={radio1 === "developers"}
            onChange={(e) => handleCircle(e)}
          />
          <label className={styles.label}>Developers</label>
        </div>
      </div>

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
                    <span className={styles.quote}>
                      Disable your post offer.
                    </span>
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
      </div>
      ):(<div>
<div className={styles.container_checkbox}>
        <div className={styles.div_checkbox_radio}>
          <input
            className={styles.checkbox}
            type="radio"
            id="edite"
            name="radio"
            value={"edit"}
            checked={radio1 === "edit"}
            onChange={(e) => handleCircle(e)}
          />
          <label className={styles.label}>Edit Detail</label>
        </div>
        <div className={styles.div_checkbox_radio}>
          <input
            className={styles.checkbox}
            type="radio"
            id="developers"
            name="radio"
            value={"developers"}
            checked={radio1 === "developers"}
            onChange={(e) => handleCircle(e)}
          />
          <label className={styles.label}>Developers</label>
        </div>
      </div>
      {
        jobDetail[0]?.applied_jobs
          ?.map((e) => e.user_account)
          ?.map((el) => {
            return (
              <div className={styles1.postsContainer}>
                <Link to={`/company/post/${el.id}`}>
                  <div className={styles1.postCard}>
                    <div className={styles1.imgContainer}>
                      {/* <img src={profile_pic} alt="profile user"/> */}
                      <Image
                        cloudName="dhar2oawa"
                        publicId={el.profile_pic}
                        //id={styles.banner}
                        //width="100"
                        //crop="scale"
                      />
                    </div>
                    <div className={styles1.detailsContainer}>
                      <p>{el.fullName}</p>
                      {el.description === null ? (
                        <p className={styles1.null}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      ) : (
                        <p>{el.description}</p>
                      )}
                      <div className={styles1.techsContainer}>
                        {el.technologies?.map((t) =>
                          t.name === "Cplus" ? (
                            <label key={t.id}>C+</label>
                          ) : t.name === "Cplusplus" ? (
                            <label key={t.id}>C++</label>
                          ) : t.name === "CSharp" ? (
                            <label key={t.id}>C#</label>
                          ) : (
                            <label key={t.id}>{t.name}</label>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        //jobDetail[0]?.applied_jobs?.map(e=>e.user_account)?.map(e=>e.fullName))
      }</div>)
  }</div>
  );
}

export default PostJobOffer;
