import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchCompanyProfile = createAsyncThunk('companyProfile/fetchCompanyProfile',
async(id)=>{
    try {
        const res=await axios.get(`/company/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    companyProfile: []
    
}

export const CompanyPSlice=createSlice({
    name:'companyProfile',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchCompanyProfile.pending]:(state)=>{
            state.status="pending"
        },
        [fetchCompanyProfile.fulfilled]:(state,{payload})=>
        {
          state.companyProfile=payload
          state.status="fulfilled"
        },
        [fetchCompanyProfile.rejected]:(state)=>
        {
         state.status="rejected"
        }   
 }
})

export const fetchActions=CompanyPSlice.actions
export default CompanyPSlice.reducer