import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchTechs=createAsyncThunk('techs/fetchTechs',
async()=>{
    try {
        const res=await axios.get('/techs')
        return res.data
    } catch (error) {
        console.log(error)
    }
}
)
const initialState = {
    techs: []
}

export const techsSlice=createSlice({
    name:'techs',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchTechs.pending]:(state)=>{
            state.status="pending"
        },
        [fetchTechs.fulfilled]:(state,{payload})=>
        {
          state.techs=payload
          state.status="fulfilled"
        },
        [fetchTechs.rejected]:(state)=>
        {
         state.status="rejected"
        }   
 }
})

export const fetchActions=fetchTechs.actions
export default techsSlice.reducer