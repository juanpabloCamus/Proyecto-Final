import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchCompanyNotifications=createAsyncThunk('companyNotifications/fetchCompanyNotifications',
async(id)=>{
    try {
        if(id){
            var res= await axios.get(`/company/notis/${id}`)
        }
        return res.data
    } catch (error) {
        console.log(error)
    }
}
)
const initialState = {
    companyNotifications : []
}

export const companyNotificationSlice=createSlice({
    name:'companyNotifications',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchCompanyNotifications.pending]:(state)=>{
            state.status="pending"
        },
        [fetchCompanyNotifications.fulfilled]:(state,{payload})=>
        {
            state.companyNotifications=payload
            state.status="fulfilled"
        },
        [fetchCompanyNotifications.rejected]:(state)=>
        {
            state.status="rejected"
        }   
}
})

export const companyNotificationsActions=companyNotificationSlice.actions
export default companyNotificationSlice.reducer