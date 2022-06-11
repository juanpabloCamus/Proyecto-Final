import React from 'react';
import styles from './ForgotPass.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function ForgotPass() {

    async function handleSubmit(e){
        e.preventDefault()
        const email = e.target[0].value
        if (!email || email === '') return Swal.fire({icon:'error',text:'Please complete the field'})
        try{
            await axios.post('/forgotpass', {email})
            .then(res => Swal.fire({icon:'success', text:res.data}))
        }catch(e){
            Swal.fire({icon:'error',text:e.response.data})
        }
    }

    return (
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <label>Please enter your registered email to help you</label>
                <input type='email' placeholder='Email...'></input>
                <button type='submit' className={styles.button}>Submit</button>
            </form>
        </div>
    );
}

export default ForgotPass;