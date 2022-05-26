import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { conditionalRegActions } from '../../redux/conditional_register/conditionalRegisterSlice';


import styles from './register.module.css'
;

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

console.log({...formValues, profileType})

const handleSubmit = (e) => {
    e.preventDefault()
    // postNewUser()

}


  return (
    <div>
        <div className={showElements ? styles.active_elements : null}>
        <button
            onClick={ activeDevForm }
        >Developer
        </button>
        <button
            onClick={ activeComForm }
        >Company
        </button>
        </div>

        <div className={showElements ? null : styles.active_elements}>
            <form onSubmit={ handleSubmit }>
                <label>Name*</label>
                <input type="text" name='name' value={ name } onChange={ handleInputChange }/>
                <label>{ condition === 'dev' ? "Email*" : "Company Email*" }</label>
                <input type="text" name='email' value={ email } onChange={ handleInputChange }/>
                <label>Password*</label>
                <button type='submit'>Send</button>
                <input type="password" name='password' value={ password } onChange={ handleInputChange }/>
               
            </form>
        </div>
    </div>
  )
}
