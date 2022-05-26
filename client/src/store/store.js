import { configureStore } from '@reduxjs/toolkit'
import conditionalRegisterSlice from '../redux/conditional_register/conditionalRegisterSlice'
import  modalSlice  from '../redux/modal_slice/modalSlice'



export const store = configureStore({
    reducer:{
       modal: modalSlice,
       conditionalReg: conditionalRegisterSlice 
    }
})

