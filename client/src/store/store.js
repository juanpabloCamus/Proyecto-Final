import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../redux/auth/authSlice'
import usersSlice  from '../redux/users/users'

export const store = configureStore({
    reducer:{
        auth: authSlice,
        users:usersSlice

    }
})

