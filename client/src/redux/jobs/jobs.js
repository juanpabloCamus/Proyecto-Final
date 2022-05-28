import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchJobs = createAsyncThunk('jobs/fetchJobs',
async({tech, seniority, time, eLevel, salary})=>{
    try {
        const res=await axios.get(`http://localhost:3001/jobs?tech=${tech}&seniority=${seniority}&time=${time}&eLevel=${eLevel}&salary=${salary}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
)
const initialState = {
    jobs: []
    
}

export const jobsSlice=createSlice({
    name:'jobs',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchJobs.pending]:(state)=>{
            state.status="pending"
        },
        [fetchJobs.fulfilled]:(state,{payload})=>
        {
          state.jobs=payload
          state.status="fulfilled"
        },
        [fetchJobs.rejected]:(state)=>
        {
         state.status="rejected"
        }   
 }
})

export const fetchActions=fetchJobs.actions
export default jobsSlice.reducer