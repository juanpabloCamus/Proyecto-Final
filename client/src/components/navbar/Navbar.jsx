import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { modalActions } from '../../redux/modal_slice/modalSlice'
import { UserNav } from './user_nav/UserNav'

import './navbar.css'

export const Navbar = () => {

const dispatch = useDispatch()


const sessionStorage = JSON.parse(localStorage.getItem("userData"))

const handleOpenLoginModal = ()  => {
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activateLoginModal(true))
}


const handleOpenRegisterModal = ()  => {
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activateRegisterModal(true))
}



  return (
      
    <nav className='nav animate__animated animate__fadeInDownBig'>
       
        <Link to="/">
            <div className="logo">
                <span>Rocket</span>
            </div>
        </Link>
        

        <ul className="navbar">

        {sessionStorage ?

            <div className='profileDiv'>
                    <Link to="/company/createjob">
                        <div className="buttonJob">
                            <span>Create new job</span>
                        </div>
                    </Link>
                    <UserNav />
            </div>
                :
            <>

                <li>
                    <button
                    onClick={ handleOpenLoginModal }
                    className="navbar_button login"
                    >Login</button>
                </li>
                <li>
                    <button
                    onClick={ handleOpenRegisterModal }
                    className="navbar_button register"
                    >Sign Up</button>
                </li>
            </>
            }
        </ul>
        
    </nav>
  )
}