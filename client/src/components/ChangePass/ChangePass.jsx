import React, { useState } from 'react';
import styles from './ChangePass.module.css';
import axios from 'axios';
import Swal from 'sweetalert2'

function ChangePass() {

    const [form, setForm] = useState({
        profileType: 'develop',
        recoverId: 0,
        password:''
    })

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        axios.post('/forgotpass/recover', form)
        .then(res => Swal.fire({icon:'success', text:res.data}))
        .catch(e => Swal.fire({icon:'error', text:e.response.data}))
    }

    return (
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <label>Account type</label>
                <select onChange={handleChange} name='profileType'>
                    <option value='develop'>Developer</option>
                    <option value='company'>Company</option>
                </select>
                <input onChange={handleChange} name='recoverId' type='number' placeholder='Enter your recover code'></input>
                <label>New password</label>
                <input name='password' onChange={handleChange} type='password'></input>
                <label>Confirm password</label>
                <input type='password'></input>
                <button className={styles.button} type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default ChangePass;