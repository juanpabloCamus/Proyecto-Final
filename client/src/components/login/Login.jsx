import { React, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
<<<<<<< HEAD
import { authActions } from '../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';


=======
//import { profileReducer } from '../../redux/Profile/profileData'
>>>>>>> 41a05aabbeadea649c79184afd8332542b776dae
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
<<<<<<< HEAD


   
    if(res.data.active === true){
      Swal.fire({
        icon: 'success',
        text: "Acceso válido"
      })
      const isLogged = true
      // dispatch(authActions.setLogin(userData))
      
      navigate('/home')
=======
    console.log(res)
    if(typeof res.data === 'object'){
      Swal.fire({
        icon: 'success',
        text: "Acceso valido"
      })

      //dispatch(profileReducer(res.data))

>>>>>>> 41a05aabbeadea649c79184afd8332542b776dae
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

  const handleSelect = (e) => {
  e.preventDefault();
  setSelect(e.target.value)
}

  let rout = '/home'

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
<<<<<<< HEAD
=======
    if(select === "Company"){
      rout = '/company'
    }
    navigate(rout)
>>>>>>> 41a05aabbeadea649c79184afd8332542b776dae
  }

  return (
    <div >
        <form onSubmit={ handleSubmit } className="login_form">

            <label>AcountType*</label>
            <select onChange={(e)=> handleSelect(e)}>
              <option value="">Select</option>
              <option value="Developer">Developer</option>
              <option value="Company">Company</option>
            </select>

            <label>Email*</label>
            <input type="text" name='email' value={ email } onChange={ handleInputChange } required/>

            <label>Password*</label>
            <input type="password" name='password' value={ password } onChange={ handleInputChange } required/>
            <button type="submit" className='login__button'>Send</button>
        </form>
    </div>
  )
}
