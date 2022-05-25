import React from 'react'
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';


import { modalActions } from '../../redux/modal_slice/modalSlice';
import { Login } from '../login/Login';
import { OptionalRegister } from '../optional_register/OptionalRegister';
import styles from './auth.module.css'

export const Auth = () => {

const { isOpen } = useSelector(state => state.modal)
const { activeLoginModal } = useSelector(state => state.modal)
const { activeRegisterModal } = useSelector(state => state.modal)

const dispatch = useDispatch()

const handleCloseModal = ()  =>{
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activateLoginModal(false))
    dispatch(modalActions.activateRegisterModal(false))
  }


  return ReactDOM.createPortal(
    <>
    {
        isOpen && 

                <>
                <div className={styles.overlay__modal}></div>
                <div className={styles.modal}>
                    <MdClose 
                        onClick={ handleCloseModal }
                        />

                    {
                        activeLoginModal && <Login/>
                    }

                    {
                        activeRegisterModal && <OptionalRegister/>
                    }
                    
                </div>
                </>
        
    }
    </>,
    document.getElementById('portal')
  )
}
