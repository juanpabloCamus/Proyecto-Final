import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import axios from "axios";

export const fetchAdminUsers = createAsyncThunk('adminUsersSlice/fetchAdminUsers',

    async()=>{
        try {
            const res = await axios.get('/admin/users')
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)


const initialState = {
    users:[]
}

const adminUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchAdminUsers.pending]:(state)=>{
            state.status="pending"
        },
        [fetchAdminUsers.fulfilled]:(state,{payload})=>
        {
          state.users=payload
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