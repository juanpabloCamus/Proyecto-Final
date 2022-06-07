import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminJobs = createAsyncThunk('adminJobSlice/fetchAdminJobs',

    async()=>{
        try {
            const res = await axios.get('/admin/jobs')
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)


const initialState = {
    jobs:[]
}

const adminJobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchAdminJobs.pending]:(state)=>{
            state.status="pending"
        },
        [fetchAdminJobs.fulfilled]:(state,{payload})=>
        {
          state.jobs=payload
          state.status="fulfilled"
        },
        [fetchAdminJobs.rejected]:(state)=>
        {
         state.status="rejected"
        } 
    }
})


export const adminJobActions = adminJobSlice.actions;
export default adminJobSlice.reducer