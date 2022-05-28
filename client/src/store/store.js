import { configureStore } from '@reduxjs/toolkit'
import conditionalRegisterSlice from '../redux/conditional_register/conditionalRegisterSlice'
import  modalSlice  from '../redux/modal_slice/modalSlice'
import companySlice  from '../redux/company/company'
import usersSlice  from '../redux/users/users'
import jobsSlice  from '../redux/jobs/jobs'
import techsSlice  from '../redux/techs/techs'
import jobDetailSlice  from '../redux/jobs/jobDetail'
<<<<<<< HEAD
import authSlice from '../redux/auth/authSlice'


=======
import profileSlice from '../redux/Profile/profileData'
>>>>>>> 41a05aabbeadea649c79184afd8332542b776dae

export const store = configureStore({
    reducer:{
        auth: authSlice,
        modal: modalSlice,
        conditionalReg: conditionalRegisterSlice,
        users:usersSlice,
        company:companySlice,
        jobs:jobsSlice,
        techs:techsSlice,
        jobDetail: jobDetailSlice,
        profile:profileSlice
    }
})

