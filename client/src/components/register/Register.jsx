import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import axios from 'axios'
import Swal from 'sweetalert2'

import { conditionalRegActions } from '../../redux/conditional_register/conditionalRegisterSlice';
import { modalActions } from '../../redux/modal_slice/modalSlice';


import './register.css'


export const Register = () => {

const [condition, setCondition] = useState('')
const [formValues, handleInputChange, reset] = useForm({
    name: '',
    fullName: '',
    email: '',
    password: ''
})

const [showElements, setShowelements] = useState(false)

const { name, fullName, email, password } = formValues

const dispatch = useDispatch()

const { profileType } = useSelector(state => state.conditionalReg)


const activeDevForm = () => {
    setCondition('dev')
    setShowelements(true)
    dispatch(conditionalRegActions.setConditionalRegister('dev'))   
}

const activeComForm = () => {
    setCondition('com')
    setShowelements(true)
    dispatch(conditionalRegActions.setConditionalRegister('com'))  
}



const postNewUser = async() => {
    try {
        const res = await axios.post('http://localhost:3001/users/register', formValues)
        if(res.data.active === true){
            Swal.fire({
                icon: 'success',
                text: res.data
                         })
              localStorage.setItem("userType", profileType)
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.data
              })
        }
        
    } catch (error) {
        console.log(error)
    }
    
}


const postNewCompany = async() => {
    try {
        const res = await axios.post('http://localhost:3001/company/register', formValues)
 
        if(res.data.active === true){
            Swal.fire({
                icon: 'success',
                text: res.data
              })
              
        }else{

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.data
              })
        }
       
    } catch (error) {
        console.log(error)
    }

}

const switchForm = () =>{
    dispatch(modalActions.activateLoginModal(true))
    dispatch(modalActions.activateRegisterModal(false))
}

const handleSubmit = (e) => {
    e.preventDefault()
    
    if(profileType === 'dev'){
        postNewUser()
        dispatch(modalActions.activateRegisterModal(false))
        dispatch(modalActions.setModalValue())
    }

    if(profileType === 'com'){
        postNewCompany()
        dispatch(modalActions.activateRegisterModal(false))
        dispatch(modalActions.setModalValue())
    }

    

}

  return (
    <div>
        <div className= { showElements ? "active_elements" : null}>
            <div className='chose_buttons'>
                <button
                    onClick={ activeDevForm }
                >Developer
                </button>
                <button
                    onClick={ activeComForm }
                >Company
                </button>
            </div>
            <div className="switch_form">
                <p
                    onClick={ switchForm }
                >Already registered?</p>
            </div>
        </div>
    
        <div className={showElements ? null : "active_elements" }>
            <form onSubmit={ handleSubmit } className="register_form">
                <label>{ condition === 'dev' ? "Full Name*" : "Name*" }</label>
                {
                    condition === 'dev' ? <input type="text" name='fullName' value={ fullName } onChange={ handleInputChange } required/>
                    :
                    <input type="text" name='name' value={ name } onChange={ handleInputChange } required/>
                }
                
                <label>{ condition === 'dev' ? "Email*" : "Company Email*" }</label>
                <input type="text" name='email' value={ email } onChange={ handleInputChange } required/>
                <label>Password*</label>
                <input type="password" name='password' value={ password } onChange={ handleInputChange } required/>
                <button type='submit' className='register__button'>Send</button>
            </form>
        </div>
    </div>
  )
}