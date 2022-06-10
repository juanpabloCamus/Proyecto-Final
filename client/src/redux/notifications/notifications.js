import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchNotifications=createAsyncThunk('notifications/fetchNotifications',
async(id)=>{
    try {
        if(id){
            var res= await axios.get(`/users/notis/${id}`)
        }
        return res.data
    } catch (error) {
        console.log(error)
    }
}
)
const initialState = {
    notifications : []
}

export const notificationSlice=createSlice({
    name:'notifications',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchNotifications.pending]:(state)=>{
            state.status="pending"
        },
        [fetchNotifications.fulfilled]:(state,{payload})=>
        {
            state.notifications=payload
            state.status="fulfilled"
        },
        [fetchNotifications.rejected]:(state)=>
        {
            state.status="rejected"
        }   
}
})

export const notificationsActions=fetchNotifications.actions
export default notificationSlice.reducer