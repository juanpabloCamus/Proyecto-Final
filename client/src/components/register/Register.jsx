import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'

import styles from './register.module.css'

export const Register = () => {

const [formValues, handleInputChange, reset] = useForm({
    name: '',
    email: '',
    password: ''
})

const [condition, setCondition] = useState('')
const [showElements, setShowelements] = useState(false)

const { name, email, password } = formValues



const activeDevForm = () => {
    setCondition('dev')
    setShowelements(true)
}

const activeComForm = () => {
    setCondition('com')
    setShowelements(true)
}




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
                <input type="password" name='password' value={ password } onChange={ handleInputChange }/>
                <button type='submit'>Send</button>
                <br /> <p>or register with</p>
                <button>git</button>
            </form>
        </div>
    </div>
  )
}
