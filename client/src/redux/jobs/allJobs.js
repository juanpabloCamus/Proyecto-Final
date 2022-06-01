import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllJobs = createAsyncThunk('allJobs/fetchAllJobs',

    async()=>{
        try {
            const res = await axios.get('http://localhost:3001/jobs')
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState = {
    allJobs:[]
}

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    extraReducers:{
        [fetchAllJobs.pending]:(state)=>{
            state.status="pending"
        },
        [fetchAllJobs.fulfilled]:(state,{payload})=>
        {
          state.allJobs=payload
          state.status="fulfilled"
        },
        [fetchAllJobs.rejected]:(state)=>
        {
         state.status="rejected"
        } 
    }
})

export default allJobsSlice.reducer