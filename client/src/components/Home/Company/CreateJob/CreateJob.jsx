import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import img from "../../../../assets/arrow.png";
import { Link } from "react-router-dom";
import { fetchTechs } from "../../../../redux/techs/techs";
import styles from './createJob.module.css'
import axios from 'axios'

let techId = 0;

export default function CreateJob() {
  const techs = useSelector((state) => state.techs.techs);
  const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
  const id = userLocalStorage.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTechs());
  }, [dispatch]);

  const [formValues, handleInputChange] = useForm({
    position: "",
    description: "",
    requirements: "",
    newTech: ""
  });

  const [seniority, setSeniority] = useState("Not Specified");
  const [time, setTime] = useState("Not Specified");
  const [english_level, setEnglish_level] = useState("Not required");
  const [salary_range, setSalary_range] = useState("Not Specified");
  const [addedTechs, setAddedTechs] = useState([]);
  const [showInput, setShowInput] = useState(false)


  const { position, description, requirements, newTech } = formValues;

  const newTechValues = {name:'Others'}
  const addedTechsModified = [...techs, newTechValues]

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


  const addNewTechnologies = () => {
    const newTechObj = {
      tech: newTech,
      id: techId++,
    };
    setAddedTechs((value) => [...value, newTechObj])
  }

  

  const addTechs = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    console.log(addedTechs?.map(el=>el.tech).includes(e.target.value))
    //console.log('hola', addedTechs?.find((el)=>el.tech==e.target.value))

    if(!addedTechs?.map(el=>el.tech).includes(e.target.value)&&addedTechs.length<8){
      const techObj = {
        tech: e.target.value,
        id: techId++,
      };
  
      if(e.target.value === "Others"){
        setShowInput(true)
      }
      else{
        setAddedTechs([...addedTechs, techObj]);
        console.log(addedTechs)
      }
    }
  };

  const handleDelete = (id) => {
    const deletedTechs = addedTechs.filter((tech) => tech.id !== id);
    setAddedTechs(deletedTechs);
  };

  

  const postNewJob = async (id) => {
    try {
      const res = await axios.post(`http://localhost:3001/jobs/${id}`, {
        position,
        description,
        time,
        salary_range,
        english_level,
        requirements,
        seniority,
        technologies: addedTechs.map((tech) => tech.tech),
      });

      if (res.data === "Oferta laboral creada correctamente.") {
        Swal.fire({
          icon: "success",
          text: res.data,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postNewJob(id);
  };

  return (
    <div>
      <Link to={"/company"}>
        <img className={styles.arrowBack} alt="arrowBack" src={img}></img>
      </Link>
      <div className={styles.form_container}>
        <div className={styles.form_title}>
          <h2>Create a new job offer</h2>
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
              <select defaultValue={"Not Specified"} className={styles.form_select} onChange={handleSeniorF}>
                <option value="Not Specified">Not specified</option>
                <option value="Senior">Senior</option>
                <option value="Semi-Senior">Semi-Senior</option>
                <option value="Junior">Junior</option>
              </select>

              <label>Time</label>
              <select defaultValue={"Not Specified"} className={styles.form_select} onChange={handleTimeF}>
                <option value="Not Specified">Not Specified</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Full-Time">Full-Time</option>
              </select>

              <label>English level</label>
              <select defaultValue={"Not required"} className={styles.form_select} onChange={handleELevelF}>
                <option value="Not required">Not required</option>
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Advanced or Native">Advanced or Native</option>
              </select>

              <label>Salary</label>
              <select defaultValue={"Not Specified"} className={styles.form_select} onChange={handleSalaryF}>
                <option value="Not Specified">Not specified</option>
                <option value="0$ - 1000$">0$ - 1000$</option>
                <option value="1000$ - 3000$">1000$ - 3000$</option>
                <option value="3000$ - 6000$">3000$ - 6000$</option>
                <option value="6000$ - 10000$">6000$ - 10000$</option>
                <option value="10000$">+ 10000$</option>
              </select>

              <label>Technologies</label>
              <select key={'sel5'} defaultValue={""} className={styles.form_select} onChange={addTechs}>
                <option value=""></option>
                {addedTechsModified.map((e) =>
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
                    <option key={e.id||e.name} value={e.name}>
                      {e.name}
                    </option>
                  )
                )}
              </select>


              <div className={`${styles.addNewTechs} ${showInput ? null : `${styles.hide}`}`}>
                <input type="search" name="newTech" value={newTech} onChange={handleInputChange}/>
                <button type="button" onClick={ addNewTechnologies } className={styles.addnewtech_button}>Add</button>
                <button type="button" onClick={() => setShowInput(false)} className={styles.addnewtech_button}>Cancel</button>
              </div>

              <div className={styles.added_techs}>
                {addedTechs.map((e, i) => (
                  <div key={i}>
                    {e.tech === "Cplus" ? (
                      <p>C+</p>
                    ) : e.tech === "Cplusplus" ? (
                      <p>C++</p>
                    ) : e.tech === "CSharp" ? (
                      <p>C#</p>
                    ) : (
                      <p>{e.tech}</p>
                    )}
                    {e.tech === "" ? (
                      <></>
                    ) : (
                      <MdClose onClick={() => handleDelete(e.id)} className={styles.delete_added_tech}/>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.form_right_column}>
            <label>Description</label>
              <textarea
                name="description"
                columns="10"
                rows="5"
                value={description}
                onChange={handleInputChange}
              ></textarea>
              <label>Requirements</label>
              <textarea
                name="requirements"
                columns="10"
                rows="5"
                value={requirements}
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
}
