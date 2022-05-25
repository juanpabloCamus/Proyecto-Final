import React from 'react'
import { useForm } from '../../hooks/useForm'
import GitHubLogin from 'react-github-login';

export const Login = () => {

const [formValues, handleInputChange, reset] = useForm({
    email: '',
    password: ''
});

const { email, password } = formValues;

//Github responses

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

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
            <br /> <p>or login with:</p>
            <GitHubLogin clientId="3fa17a142cea230151ea"
                    redirectUri="http://localhost:3000/"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
        </form>
    </div>
  )
}
