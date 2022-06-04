import React, { useState } from "react";
import styles from './EditDevEduForm.module.css';
import axios from "axios";
import Swal from 'sweetalert2'

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

    let [error, setError] = useState({
        institution: false,
        institution: false,
    })

    function handleErrors(e){

        if(e.target.name === 'institution'){
            if (e.target.value === '') setError({...error, institution:true})
            else setError({...error, institution:false})
        }

        if(e.target.name === 'degree'){
            if (e.target.value === '') setError({...error, degree:true})
            else setError({...error, degree:false})
        }
    }

    function handleChange(e){
        setEducation({
            ...education,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if (error.institution === true || error.degree === true) return Swal.fire({icon: 'error', text:'Complete the required fields'})
        axios.post(`http://localhost:3001/users/${id}/education`, education)
        .then(res => console.log(res.data))
        .catch(err => Swal.fire({icon: 'error', text: err.response.data}))
    }
    

    return (
        <div >
            <form className={styles.formContainer}>
                <label>Institution</label>
                <input onChange={handleChange} name="institution"></input>
                {error.institution === true ? <label id={styles.error}>You must complete this field</label> : null}
                <label>Degree</label>
                <input onChange={handleChange} name="degree"></input>
                {error.degree === true ? <label id={styles.error}>You must complete this field</label> : null}
                <label>Start date</label>
                <input onChange={handleChange} name='start_date' type='date'></input>
                <label>End date</label>
                <input onChange={handleChange} name='end_date' type='date'></input>
                <label>Description</label>
                <textarea onChange={handleChange} name="description"></textarea>
                <button type="submit" onClick={handleSubmit}>Add education</button>
            </form>
        </div>
    );
}

export default EditDevEduForm;