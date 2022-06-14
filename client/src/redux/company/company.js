import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchCompany=createAsyncThunk('company/fetchCompany',
async(id)=>{
    try {
        const res=await axios.get(`/company/${id}`)
        return res.data[0]
    } catch (error) {
        console.log(error)
    }
}
)


export const fetchCompanies=createAsyncThunk('company/fetchCompany',
async()=>{
    try {
        const res=await axios.get('/company')
        return res.data
    } catch (error) {
        console.log(error)
    }
}
)


const initialState = {
    company: [],
    companies:[]
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
          state.companies=payload     
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