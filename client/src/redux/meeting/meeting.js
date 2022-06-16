import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchMeeting=createAsyncThunk('meeting/fetchMeeting',
async(id_meet)=>{
    try {
        const res=await axios.get(`/meeting/room/${id_meet}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
    
})

const initialState = {
    meeting: {},
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
          state.meeting=payload
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