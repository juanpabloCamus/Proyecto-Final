import React, { useState } from "react";
import styles from './EditDevExpForm.module.css';
import axios from "axios";

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

    function handleChange(e){
        setExperience({
            ...experience,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        axios.post(`http://localhost:3001/users/${id}/experience`, experience)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    

    return (
        <div >
            <form className={styles.formContainer}>
                <input onChange={handleChange} name="company"></input>
                <input onChange={handleChange} name="position"></input>
                <input onChange={handleChange} name='start_date' type='date'></input>
                <input onChange={handleChange} name='end_date' type='date'></input>
                <textarea onChange={handleChange} name="description"></textarea>
                <button type="submit" onClick={handleSubmit}>Add experience</button>
            </form>
        </div>
    );
}

export default EditDevExpForm;