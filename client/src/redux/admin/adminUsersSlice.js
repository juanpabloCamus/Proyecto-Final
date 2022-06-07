import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import axios from "axios";

export const fetchAdminUsers = createAsyncThunk('adminUsersSlice/fetchAdminUsers',

    async()=>{
        try {
            const res = await axios.get('/admin/users')
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)


const initialState = {
    users:[],
    copyUsers: [],
    usersLength:[]
}

const adminUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        filterByValue(state, {payload}){
            state.users = state.copyUsers.filter(user => user.fullName.toLowerCase().includes(payload.toLowerCase()))
        }
    },
    extraReducers:{
        [fetchAdminUsers.pending]:(state)=>{
            state.status="pending"
        },
        [fetchAdminUsers.fulfilled]:(state,{payload})=>
        {
          state.users=payload
          state.copyUsers=payload
          state.usersLength=payload.length
          state.status="fulfilled"
        },
        [fetchAdminUsers.rejected]:(state)=>
        {
         state.status="rejected"
        } 
    }
})


export const adminUsersActions = adminUsersSlice.actions;
export default adminUsersSlice.reducer