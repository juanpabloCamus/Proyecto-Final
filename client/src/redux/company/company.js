import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
export const fetchCompany=createAsyncThunk('company/fetchCompany',
async()=>{
    try {
        const res=await axios.get('http://localhost:3001/company')
        return res.data
    } catch (error) {
        console.log(error)
    }
}
)
const initialState = {
    company: []
}

export const companySlice=createSlice({
    name:'company',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchCompany.pending]:(state)=>{
            state.status="pending"
        },
        [fetchCompany.fulfilled]:(state,{payload})=>
        {
          state.company=payload
          state.status="fulfilled"
        },
        [fetchCompany.rejected]:(state)=>
        {
         state.status="rejected"
        }   
 }
})

export const fetchActions=fetchCompany.actions
export default companySlice.reducer