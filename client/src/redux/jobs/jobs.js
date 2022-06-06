import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchJobs = createAsyncThunk('jobs/fetchJobs',
async({tech, seniority, time, eLevel, salary, search})=>{
    try {
        console.log(search)
        const res=await axios.get(`/jobs?tech=${tech}&seniority=${seniority}&time=${time}&eLevel=${eLevel}&salary=${salary}&search=${search}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    jobs: [],
    filterJobs: []
    
}

export const jobsSlice=createSlice({
    name:'jobs',
    initialState,
    reducers:{
        filterJobsOffer(state,{payload}){
            
            // state.jobs=state.jobs[0].offers.filter(e => e.active==payload)
            
        }
    },
    extraReducers:{
        [fetchJobs.pending]:(state)=>{
            state.status="pending"
        },
        [fetchJobs.fulfilled]:(state,{payload})=>
        {
          state.jobs=payload
          state.status="fulfilled"
          state.filterJobs=payload
        },
        [fetchJobs.rejected]:(state)=>
        {
         state.status="rejected"
        }   
 }
})

export const fetchActions=jobsSlice.actions
export default jobsSlice.reducer