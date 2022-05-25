import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../redux/auth/authSlice'


export const store = configureStore({
    reducer:{
        auth: authSlice
    }
})

