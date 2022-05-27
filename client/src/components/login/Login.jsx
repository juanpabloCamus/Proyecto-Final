import React from 'react'
import { useForm } from '../../hooks/useForm'
import axios from 'axios'

import './login.css'


export const Login = () => {

const [formValues, handleInputChange, reset] = useForm({
    email: '',
    password: ''
});

const { email, password } = formValues;

const loginUser = async() => {
 try {
    await axios.post('http://localhost:3001/login', formValues)
 } catch (error) {
   console.log(error);
 }
}


const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  }

  return (
    <div >
        <form onSubmit={ handleSubmit } className="login_form">
            <label>Email*</label>
            <input type="text" name='email' value={ email } onChange={ handleInputChange } required/>
            <label>Password*</label>
            <input type="password" name='password' value={ password } onChange={ handleInputChange } required/>
            <button type="submit" className='login__button'>Send</button>
        </form>
    </div>
  )
}
