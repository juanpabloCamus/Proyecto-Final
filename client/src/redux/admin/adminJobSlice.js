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
    jobs:[],
    jobsCopy:[],
    jobsLength:[]
}

const adminJobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers:{
        filterByValue(state, {payload}){
            state.jobs=state.jobsCopy.filter(job => job.company_accounts[0].name.toLowerCase().includes(payload.toLowerCase()) || job.position.toLowerCase().includes(payload.toLowerCase()))
        }
    },
    extraReducers:{
        [fetchAdminJobs.pending]:(state)=>{
            state.status="pending"
        },
        [fetchAdminJobs.fulfilled]:(state,{payload})=>
        {
          state.jobs=payload
          state.jobsCopy=payload
          state.jobsLength=payload.length
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