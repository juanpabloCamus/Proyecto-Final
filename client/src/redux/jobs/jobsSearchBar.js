import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const jobsSearchBar = createAsyncThunk('jobs/fetchJobs',
async(tech)=>{
    try {
        const res=await axios.get(`http://localhost:3001/jobs?tech=${tech}`)
        return res.data[0].offers
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
        [jobsSearchBar.pending]:(state)=>{
            state.status="pending"
        },
        [jobsSearchBar.fulfilled]:(state,{payload})=>
        {
          state.jobs=payload
          state.status="fulfilled"
        },
        [jobsSearchBar.rejected]:(state)=>
        {
         state.status="rejected"
        }   
 }
})

export const fetchActions=jobsSearchBar.actions
export default jobsSlice.reducer