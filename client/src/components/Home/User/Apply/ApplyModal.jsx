import React from 'react'
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';

import { modalActions } from '../../../../redux/modal_slice/modalSlice'
import Apply from './Apply';

export const ApplyModal = () => {

const { isOpen } = useSelector(state => state.modal)
const { activeApplyModal } = useSelector(state => state.modal)


const dispatch = useDispatch()

const handleCloseModal = ()  =>{
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activeApplyModal(false))

}


  return ReactDOM.createPortal(
    <>
    {
        isOpen && 

                <>
                <div className="overlay__modal"></div>
                <div className="modal">
                    <div className='close__icon'>
                        <MdClose 
                            onClick={ handleCloseModal }
                            />
                    </div>
                    <div className='form_container'>
                    {
                        activeApplyModal && <Apply/>
                    }
                    </div>
                </div>
                </>
        
    }
    </>,
    document.getElementById('apply')
  )
}
