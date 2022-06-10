import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchMeeting=createAsyncThunk('meeting/fetchMeeting',
async(id)=>{
    try {
        const res=axios.get(`/meeting/room/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
    
})

const initialState = {
    meet: {},
}
export const meetingSlice=createSlice({
    name:'meeting',
    initialState,
    reducers:{
       
    },
    extraReducers:{
        [fetchMeeting.pending]:(state)=>{
            state.status="pending"
        },
        [fetchMeeting.fulfilled]:(state,{payload})=>
        {
          state.meet=payload
          state.status="fulfilled"
        },
        [fetchMeeting.rejected]:(state)=>
        {
         state.status="rejected"
        }   
 }
})

export const fetchActions=fetchMeeting.actions
export default meetingSlice.reducer