import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import Swal from 'sweetalert2'

import './login.css'


export const Login = () => {

const [formValues, handleInputChange, reset] = useForm({
    email: '',
    password: ''
});

const { email, password } = formValues;

const navigate = useNavigate()


const loginUser = async() => {
 try {
    const res = await axios.post('http://localhost:3001/login', formValues)
    console.log(res)
    if(res.data === "Acceso valido"){
      Swal.fire({
        icon: 'success',
        text: res.data
      })
    }else{
      Swal.fire({
        icon: 'error',
        text: res.data
      })
    }
 } catch (error) {
   console.log(error);
 }
}

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    loginUser();
    navigate('/home')
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
