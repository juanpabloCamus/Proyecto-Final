import React, { useState } from "react";
import styles from './EditDevExpForm.module.css';
import axios from "axios";
import Swal from 'sweetalert2'

function EditDevExpForm() {

    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const { id } = userLocalStorage
    
    let [experience, setExperience] = useState({
        company:'',
        position:'',
        start_date:'',
        end_date:'',
        description:''
    })

    let [error, setError] = useState({
        company: true,
        position: true,
        start_date: true,
        end_date:true
    })

    function handleErrors(e){

        if(e.target.name === 'company'){
            if (e.target.value === '') setError({...error, company:true})
            else setError({...error, company:false})
        }

        if(e.target.name === 'position'){
            if (e.target.value === '') setError({...error, position:true})
            else setError({...error, position:false})
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
        setExperience({
            ...experience,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if (error.company || error.position || error.start_date || error.end_date) return 
        axios.post(`/users/${id}/experience`, experience)
        .then(res =>{Swal.fire({icon: 'success', text: res.data})})
        .catch(err => {Swal.fire({icon: 'error', text: err.response.data})})
    }

    const [check, setCheck] = useState(false)
    function handleCheck(){
        check ? setCheck(false) : setCheck(true)
    }
    

    return (
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <label>Company*</label>
                <input onChange={handleChange} name="company"></input>
                <label>Position*</label>
                <input onChange={handleChange} name="position"></input>
                <label>Start date*</label>
                <input onChange={handleChange} name='start_date' type='date'></input>
                <label>End date*</label>
                {check ? null : <input onChange={handleChange} name='end_date' type='date'></input>}
                <div className={styles.checkbox}>
                    <input checked={check} onClick={handleCheck} onChange={handleChange} name='end_date' value='1800-12-12' type='checkbox'></input>
                    <label>I am working here currently</label>
                </div>
                <label>Description</label>
                <textarea onChange={handleChange} name="description"></textarea>
                {error.company || error.position || error.start_date || error.end_date ? <label id={styles.error}>You must complete company, postion and dates fields</label> : null}
                <button type="submit" onClick={handleSubmit}>Add experience</button>
            </form>
        </div>
    );
}

export default EditDevExpForm;