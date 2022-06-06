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
        company: false,
        position: false,
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
        if (error.position === true || error.company === true) return Swal.fire({icon: 'error', text:'Complete the required fields'})
        axios.post(`/users/${id}/experience`, experience)
        .then(res => console.log(res.data))
        .catch(err => Swal.fire({icon: 'error', text: err.response.data}))
    }
    

    return (
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <label>Company</label>
                <input onChange={handleChange} name="company"></input>
                {error.company === true ? <label id={styles.error}>You must complete this field</label> : null}
                <label>Position</label>
                <input onChange={handleChange} name="position"></input>
                {error.position === true ? <label id={styles.error}>You must complete this field</label> : null}
                <label>Start date</label>
                <input onChange={handleChange} name='start_date' type='date'></input>
                <label>End date</label>
                <input onChange={handleChange} name='end_date' type='date'></input>
                <label>Description</label>
                <textarea onChange={handleChange} name="description"></textarea>
                <button type="submit" onClick={handleSubmit}>Add experience</button>
            </form>
        </div>
    );
}

export default EditDevExpForm;