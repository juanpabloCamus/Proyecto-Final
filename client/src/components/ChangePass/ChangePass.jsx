import React, { useState } from 'react';
import styles from './ChangePass.module.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router';

function ChangePass() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        profileType: 'develop',
        recoverId: 0,
        password:'',
        confirmPass:''
    })

    const [error, setError] = useState({
        match: false,
        password: false
    })

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(form.recoverId === 0) return Swal.fire({icon:'error', text:'Enter your recovery code'})
        if(form.password === '') return Swal.fire({icon:'error', text:'Enter your new password'})
        if(!form.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\x00-\xFF\d]{8,}$/)) return setError({...error,password:true})
        if(form.password !== form.confirmPass) return setError({password:false,match:true})
        setError({password:false,match:false})

        axios.post('/forgotpass/recover', form)
        .then(res => Swal.fire({icon:'success', text:res.data}, navigate('/')))
        .catch(e => Swal.fire({icon:'error', text:e.response.data}))
    }

    return (
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h2>Change your password</h2>
                <label>Account type</label>
                <select onChange={handleChange} name='profileType'>
                    <option value='develop'>Developer</option>
                    <option value='company'>Company</option>
                </select>
                <label>Recovery code</label>
                <input onChange={handleChange} name='recoverId' type='number' placeholder='Enter your recover code'></input>
                <label>New password</label>
                <input name='password' onChange={handleChange} type='password'></input>
                <label>Confirm password</label>
                <input name='confirmPass' onChange={handleChange} type='password'></input>
                {error.password ? <label id={styles.error}>Password must have a least 8 characters,an uppercase, a lowercase and a number</label> : null}
                {error.match ? <label id={styles.error}>Passwords do not match</label> : null}
                <button className={styles.button} type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default ChangePass;