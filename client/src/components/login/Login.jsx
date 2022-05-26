import React from 'react'
import { useForm } from '../../hooks/useForm'

export const Login = () => {

const [formValues, handleInputChange, reset] = useForm({
    email: '',
    password: ''
});

const { email, password } = formValues;



const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
        <form onSubmit={ handleSubmit }>
            <label>Email*</label>
            <input type="text" name='email' value={ email } onChange={ handleInputChange }/>
            <label>Password*</label>
            <input type="password" name='password' value={ password } onChange={ handleInputChange }/>
            
        </form>
    </div>
  )
}
