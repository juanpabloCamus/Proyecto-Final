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
        institution: true,
        degree: true,
        start_date: true,
        end_date:true
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

        if(e.target.name === 'start_date'){
            if (e.target.value === '') setError({...error, start_date:true})
            else setError({...error, start_date:false})
        }

        if(e.target.name === 'end_date'){
            if (e.target.value === '') setError({...error, end_date:true})
            else setError({...error, end_date:false})
        }
    }

    function handleChange(e){
        handleErrors(e)
        setEducation({
            ...education,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if (error.institution || error.degree || error.start_date || error.end_date) return 
        axios.post(`/users/${id}/education`, education)
        .then(res => {Swal.fire({icon: 'success', text: res.data})})
        .catch(err => Swal.fire({icon: 'error', text: err.response.data}))
    }

    
    const [check, setCheck] = useState(false)
    function handleCheck(){
        check ? setCheck(false) : setCheck(true)
    }
    

    return (
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <label>Institution*</label>
                <input onChange={handleChange} name="institution"></input>
                <label>Degree*</label>
                <input onChange={handleChange} name="degree"></input>
                <label>Start date*</label>
                <input onChange={handleChange} name='start_date' type='date'></input>
                <label>End date*</label>
                {check ? null : <input onChange={handleChange} name='end_date' type='date'></input>}
                <div className={styles.checkbox}>
                    <input checked={check} onClick={handleCheck} onChange={handleChange} name='end_date' value='1800-12-12' type='checkbox'></input>
                    <label>I am study here currently</label>
                </div>
                <label>Description</label>
                <textarea onChange={handleChange} name="description"></textarea>
                {error.institution || error.degree || error.start_date || error.end_date ? <label id={styles.error}>You must complete institution, degree and dates fields</label> : null}
                <button type="submit" onClick={handleSubmit}>Add education</button>
            </form>
        </div>
    );
}

export default EditDevEduForm;