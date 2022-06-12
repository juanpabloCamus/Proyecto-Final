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
const [formValues, handleInputChange] = useForm({
    name: '',
    fullName: '',
    email: '',
    password: ''
})

const [error, setError] = useState({
    error: false,
    errorMsg:''
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
        const res = await axios.post('/users/register', formValues)
        if(res.data.active === true){
            dispatch(modalActions.activateRegisterModal(false))
            dispatch(modalActions.setModalValue())
            Swal.fire({
                icon: 'success',
                text: 'User created'
              })
              localStorage.setItem("userType", profileType)
        }
        else{
            setError({...error, error: true, errorMsg: res.data})
        }
        
    } catch (error) {
        console.log(error)
    }
    
}


const postNewCompany = async() => {
    try {
        const res = await axios.post('/company/register', formValues)
 
        if(res.data.active === true){
            dispatch(modalActions.activateRegisterModal(false))
            dispatch(modalActions.setModalValue())
            Swal.fire({
                icon: 'success',
                text: "Company created"
              })
              
        }else{
            setError({...error, error: true, errorMsg: res.data})
        }
       
    } catch (error) {
        console.log(error)
    }

}

const switchForm = () =>{
    dispatch(modalActions.activateLoginModal(true))
    dispatch(modalActions.activateRegisterModal(false))
}

// const validateForm = () =>{

//     if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\x00-\xFF\d]{8,}$/)){
//         setError({...error, error: true, errorMsg: "Password must have a least 8 characters,an uppercase, a lowercase and a number"})
//         return false 
//     }

//     return true
// }   


const handleSubmit = (e) => {
    e.preventDefault()
    
    // if(validateForm()){

        if(profileType === 'dev'){
            postNewUser()
    
        }
    
        if(profileType === 'com'){
            postNewCompany()
    
        // }
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
                {error.error ? <label id='error'>{error.errorMsg}</label> : null}
            </form>
        </div>
    </div>
  )
}