import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useForm } from "../../../../../hooks/useForm";
import { MdClose } from "react-icons/md";
import { modalActions } from "../../../../../redux/modal_slice/modalSlice";
import styles from "./EditJobOffer.module.css";
import { fetchTechs } from "../../../../../redux/techs/techs";
import Swal from "sweetalert2";
import { fetchJobDetail } from "../../../../../redux/jobs/jobDetail";
import PostJobOffer from "../PostJobOfferDetail";
import { fetchCompany } from "../../../../../redux/company/company";

let techId = 0;
export const EditJobOffer = () => {
  const { id } = useParams();
  const techs = useSelector((state) => state.techs.techs);
  let jobsCompanyDetail = useSelector((state) => state.company.company);
  let detail = jobsCompanyDetail.jobs?.find((e) => e.id == id);
  const dispatch = useDispatch();

  const [formValues, handleInputChange, reset] = useForm({
    position: detail.position,
    description: detail.description,
    time: detail.time,
    salary_range: detail.salary_range,
    english_level: detail.english_level,
    requirements: detail.requirements,
    seniority: detail.seniority,
    technologies: detail.technologies,
  });

  const [seniority, setSeniority] = useState(detail.seniority);
  const [time, setTime] = useState(detail.time);
  const [english_level, setEnglish_level] = useState(detail.english_level);
  const [salary_range, setSalary_range] = useState(detail.salary_range);
  const [addedTechs, setAddedTechs] = useState(detail.technologies);

  const { position, description, requirements } = formValues;

  useEffect(() => {
    dispatch(fetchTechs());
  }, [dispatch]);

  const handleSeniorF = (e) => {
    setSeniority(e.target.value);
  };

  const handleTimeF = (e) => {
    setTime(e.target.value);
  };

  const handleELevelF = (e) => {
    setEnglish_level(e.target.value);
  };

  const handleSalaryF = (e) => {
    setSalary_range(e.target.value);
  };

  const addTechs = (e) => {
    //console.log(addedTechs)
    //console.log(addedTechs.map(el=>el.))
    let repeatedTech = addedTechs.filter(
      (el) => el.tech === e.target.value || el.name === e.target.value
    );
    //console.log(repeatedTech.length)
    if (!repeatedTech.length && addedTechs.length < 8) {
      const techObj = {
        tech: e.target.value,
        id: techId++,
      };
      setAddedTechs((value) => [...value, techObj]);
    }
  };

  const handleDelete = (id) => {
    const deletedTechs = addedTechs.filter((tech) => tech.id !== id);
    setAddedTechs(deletedTechs);
  };

  const handleCloseModal = () => {
    dispatch(modalActions.setModalValue());
  };
  const handleSubmit = (e) => {
    dispatch(modalActions.activateDelete(false))
    e.preventDefault();
    editOffer(id);
    setTimeout(function () {
      setIsVisible(true);
    }, 3000);
    console.log(visible);
    // while(!visible)
    
    dispatch(modalActions.setModalValue());
    window.setTimeout(function () {
      window.location.reload();
    }, 3000);
    // window.location.reload()
  };
  const [visible, setIsVisible] = React.useState(false);

  const editOffer = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3001/jobs/${id}`, {
        position,
        description,
        time,
        salary_range,
        english_level,
        requirements,
        seniority,
        technologies: addedTechs.map((tech) => tech.tech || tech.name),
      });

      if (res.data) {
        Swal.fire({
          icon: "success",
          text: res.data,
          showConfirmButton: false,
          showCancelButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: res.data,
          showConfirmButton: false,
          showCancelButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.form_container}>
        <div className={styles.form_title}>
          <h2>Edit Job Offer</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.create_job_form}>
            <div className={styles.form_left_column}>
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={position}
                onChange={handleInputChange}
              />

              <label>Seniority</label>
              <select
                value={seniority}
                className={styles.form_select}
                onChange={handleSeniorF}
              >
                <option value="Not Specified">Not Specified</option>
                <option value="Senior">Senior</option>
                <option value="Semi-Senior">Semi-Senior</option>
                <option value="Junior">Junior</option>
              </select>

              <label>Time</label>
              <select
                value={time}
                className={styles.form_select}
                onChange={handleTimeF}
              >
                <option value=""></option>

                <option value="Not Specified">Not Specified</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Full-Time">Full-Time</option>
              </select>

              <label>English Level</label>
              <select
                value={english_level}
                className={styles.form_select}
                onChange={handleELevelF}
              >
                <option value=""></option>

                <option value="Not required">Not required</option>
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Advanced or Native">Advanced or Native</option>
              </select>

              <label>Salary Range</label>
              <select
                value={salary_range}
                className={styles.form_select}
                onChange={handleSalaryF}
              >
                <option value=""></option>
                <option value="Not Specified">Not Specified</option>
                <option value="0$ - 1000$">0$ - 1000$</option>
                <option value="1000$ - 3000$">1000$ - 3000$</option>
                <option value="3000$ - 6000$">3000$ - 6000$</option>
                <option value="6000$ - 10000$">6000$ - 10000$</option>
                <option value="10000$">+ 10000$</option>
              </select>

              <label>Technologies</label>
              <select className={styles.form_select} onChange={addTechs}>
                <option value=""></option>

                {techs.map((e) =>
                  e.name === "Cplus" ? (
                    <option key={e.id} value={e.name}>
                      C+
                    </option>
                  ) : e.name === "Cplusplus" ? (
                    <option key={e.id} value={e.name}>
                      C++
                    </option>
                  ) : e.name === "CSharp" ? (
                    <option key={e.id} value={e.name}>
                      C#
                    </option>
                  ) : (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  )
                )}
              </select>

              <div className={styles.added_techs}>
                {addedTechs.map((e, i) => (
                  <div className={styles.added_tech} key={i}>
                    {e.name === "Cplus" || e.tech === "Cplus" ? (
                      <p>C+</p>
                    ) : e.name === "Cplusplus" || e.tech === "Cplusplus" ? (
                      <p>C++</p>
                    ) : e.name === "CSharp" || e.tech === "CSharp" ? (
                      <p>C#</p>
                    ) : (
                      <p>{e.name || e.tech}</p>
                    )}
                    {e.name === "" ? (
                      <></>
                    ) : (
                      <>
                        <MdClose
                          className={styles.buttonDelete}
                          onClick={() => handleDelete(e.id)}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.form_right_column}>
              <label>Requirements</label>
              <textarea
                name="requirements"
                columns="10"
                rows="5"
                value={requirements}
                onChange={handleInputChange}
              ></textarea>
              <label>Description</label>
              <textarea
                name="description"
                columns="10"
                rows="5"
                value={description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className={styles.form_button}>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};