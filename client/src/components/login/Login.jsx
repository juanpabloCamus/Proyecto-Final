import { React, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { authActions } from '../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../redux/modal_slice/modalSlice';


import Swal from 'sweetalert2'
import './login.css'


export const Login = () => {

const [formValues, handleInputChange, reset] = useForm({
    email: '',
    password: ''
});

const { email, password } = formValues;
const { profileType } = useSelector(state => state.conditionalReg)

const [select, setSelect] = useState("")

const navigate = useNavigate()
const dispatch = useDispatch()


const loginUser = async() => {
 try {
    const res = await axios.post('http://localhost:3001/login', formValues)

    if(res.data.active === true){
      Swal.fire({
        icon: 'success',
        text: "Acceso válido"
      })
      const isLogged = true
      // dispatch(authActions.setLogin(userData))
      
      navigate('/home')
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
    loginUser();
    dispatch(modalActions.setModalValue())
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
