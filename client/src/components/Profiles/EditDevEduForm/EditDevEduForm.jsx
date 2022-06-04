import React, { useState } from "react";
import styles from './EditDevEduForm.module.css';
import axios from "axios";

function EditDevEduForm() {

    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const { id } = userLocalStorage
    
    let [education, setEducation] = useState({
        institution:'',
        degree:'',
        start_date:'',
        end_date:'',
        description:''
    })

    function handleChange(e){
        setEducation({
            ...education,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        axios.post(`http://localhost:3001/users/${id}/education`, education)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    

    return (
        <div >
            <form className={styles.formContainer}>
                <input onChange={handleChange} name="institution"></input>
                <input onChange={handleChange} name="degree"></input>
                <input onChange={handleChange} name='start_date' type='date'></input>
                <input onChange={handleChange} name='end_date' type='date'></input>
                <textarea onChange={handleChange} name="description"></textarea>
                <button type="submit" onClick={handleSubmit}>Add education</button>
            </form>
        </div>
    );
}

export default EditDevEduForm;