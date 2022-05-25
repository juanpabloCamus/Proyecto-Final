import React, {  useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { GoogleLogin } from 'react-google-login';
import GitHubLogin from 'react-github-login';

import styles from './register.module.css'
;

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

//Google register response

const handleLogin = (response) => {
    console.log(response.tokenObj);
}

const handleFailure = (result) => {
    console.log(result)
}

//Github responses

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);



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
                <br /> <p>or register with:</p>
                {/* <GoogleLogin
                    clientId="996200896012-95ji9s0sqfr03css2fhl4f57u752u70e.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={ handleLogin }
                    onFailure={ handleFailure }
                    cookiePolicy={'single_host_origin'}
                /> */}

                <GitHubLogin clientId="3fa17a142cea230151ea"
                    redirectUri="http://localhost:3000/"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
            </form>
        </div>
    </div>
  )
}
