import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../redux/auth/authSlice'
import companySlice  from '../redux/company/company'
import usersSlice  from '../redux/users/users'
import jobsSlice  from '../redux/jobs/jobs'
import techsSlice  from '../redux/techs/techs'

export const store = configureStore({
    reducer:{
        auth: authSlice,
        users:usersSlice,
        company:companySlice,
        jobs:jobsSlice,
        techs:techsSlice
    }
})

