import { configureStore } from '@reduxjs/toolkit'
import conditionalRegisterSlice from '../redux/conditional_register/conditionalRegisterSlice'
import  modalSlice  from '../redux/modal_slice/modalSlice'
import companySlice  from '../redux/company/company'
import usersSlice  from '../redux/users/users'
import jobsSlice  from '../redux/jobs/jobs'
import techsSlice  from '../redux/techs/techs'
import jobDetailSlice  from '../redux/jobs/jobDetail'
import authSlice from '../redux/auth/authSlice'
import CompanyPSlice from '../redux/Profile/profileData'
import allJobsSlice from '../redux/jobs/allJobs'

export const store = configureStore({
    reducer:{
        auth: authSlice,
        modal: modalSlice,
        conditionalReg: conditionalRegisterSlice,
        users:usersSlice,
        company:companySlice,
        companyProfile: CompanyPSlice,
        techs:techsSlice,
        jobDetail: jobDetailSlice,
        jobs:jobsSlice,
        allJobs: allJobsSlice
    }
})

