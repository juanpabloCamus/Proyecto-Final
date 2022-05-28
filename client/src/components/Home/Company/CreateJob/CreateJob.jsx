import React, { useState } from 'react'
import { useForm } from '../../../../hooks/useForm'
import styles from './createJob.module.css'

export default function CreateJob() {


  const [formValues, handleInputChange] = useForm({
    position: '', 
    description: '',
    requirements: '',
  })


  const [seniority, setSeniority] = useState("");
  const [time, setTime] = useState("");
  const [english_level, setEnglish_level] = useState("");
  const [salary_range, setSalary_range] = useState("");

  const { position, description,  requirements } = formValues


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


  const handleSubmit = (e) => {
    e.preventDefault()
  }




  return (
    <div className={styles.form_container}>
      <div className={styles.form_title}>
        <h2>Create a new job offer</h2>
      </div>
      <form className={styles.create_job_form} onSubmit={handleSubmit}>
          <div className={styles.form_left_column}>
            <label>Position</label>
            <input type="text" name="position" value={position} onChange={handleInputChange}/>

            <select className={styles.form_select} onChange={handleSeniorF}>
             
             <option value="" default>Seniority</option>
              <option value="No Especificado">No Especificado</option>
              <option value="Senior">Senior</option>
              <option value="Semi-Senior">Semi-Senior</option>
              <option value="Junior">Junior</option>
            </select>
          

         <select className={styles.form_select} onChange={handleTimeF}>
            <option value="" default>Time</option>
              <option value="No Especificado">No Especificado</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Full-Time">Full-Time</option>
            </select>
         
         
            <select className={styles.form_select} onChange={handleELevelF}>
            <option value="" default>English Level</option>
              <option value="No Especificado">No Especificado</option>
              <option value="No Requerido">No Requerido</option>
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Advanced or Native">Advanced or Native</option>
            </select>
         

         
            <select className={styles.form_select}  onChange={handleSalaryF}>
            <option value="" default>Salary</option>
              <option value="No Especificado">No Especificado</option>
              <option value="0$ - 1000$">0$ - 1000$</option>
              <option value="1000$ - 3000$">1000$ - 3000$</option>
              <option value="3000$ - 6000$">3000$ - 6000$</option>
              <option value="6000$ - 10000$">6000$ - 10000$</option>
              <option value="+ 10000$">+ 10000$</option>
            </select>
            

          </div>
          <div className={styles.form_right_column}>
              <label>Requirements</label>
              <textarea name="requirements" columns="10" rows="6" value={requirements} onChange={handleInputChange}></textarea>
              <label>Description</label>
              <textarea name="description" columns="10" rows="8" value={description} onChange={handleInputChange}></textarea>
          </div>
      </form>
    </div>
  )
}
