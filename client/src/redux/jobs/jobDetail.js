import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchJobDetail=createAsyncThunk('jobs/fetchJobs',
async(id)=>{
    try {
        if(id){
            var res= await axios.get(`http://localhost:3001/jobs/${id}`)
            
        }
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}
)
const initialState = {
    jobDetail : {}
}

export const jobDetailSlice=createSlice({
    name:'jobDetail',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchJobDetail.pending]:(state)=>{
            state.status="pending"
        },
        [fetchJobDetail.fulfilled]:(state,{payload})=>
        {
            state.jobDetail=payload
            state.status="fulfilled"
        },
        [fetchJobDetail.rejected]:(state)=>
        {
            state.status="rejected"
        }   
}
})

export const fetchActions=fetchJobDetail.actions
export default jobDetailSlice.reducer