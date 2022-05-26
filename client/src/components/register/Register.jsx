import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { conditionalRegActions } from '../../redux/conditional_register/conditionalRegisterSlice';

import axios from 'axios'
import './register.css'


export const Register = () => {
 
const [condition, setCondition] = useState('')
const [formValues, handleInputChange, reset] = useForm({
    name: '',
    email: '',
    password: ''
})

const [showElements, setShowelements] = useState(false)

const { name, email, password } = formValues

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



const postNewUser = () => {
    try {
        axios.post('http://localhost:3001/users/register', formValues)
    } catch (error) {
        console.log(error)
    }
}


const postNewCompany = () => {
    try {
        axios.post('http://localhost:3001/company/register', formValues)
    } catch (error) {
        console.log(error)
    }
}


const handleSubmit = (e) => {
    e.preventDefault()

    if(profileType === 'dev'){
        console.log('Dev');
        postNewUser()
    }

    if(profileType === 'com'){
        console.log('Com');
        postNewCompany()
    }

}
// {showElements ? "active_elements" : null}

  return (
    <div>
        <div className= {`chose_buttons ${showElements ? "active_elements" : null}`}>
        <button
            onClick={ activeDevForm }
        >Developer
        </button>
        <button
            onClick={ activeComForm }
        >Company
        </button>
        </div>

        <div className={showElements ? null : "active_elements" }>
            <form onSubmit={ handleSubmit } className="register_form">
                <label>Full Name*</label>
                <input type="text" name='name' value={ name } onChange={ handleInputChange }/>
                <label>{ condition === 'dev' ? "Email*" : "Company Email*" }</label>
                <input type="text" name='email' value={ email } onChange={ handleInputChange }/>
                <label>Password*</label>
                <input type="password" name='password' value={ password } onChange={ handleInputChange }/>
                <button type='submit' className='register__button'>Send</button>
            </form>
        </div>
    </div>
  )
}
