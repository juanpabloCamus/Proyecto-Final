import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminCompanies = createAsyncThunk('adminCompanySlice/fetchAdminCompanies',

    async()=>{
        try {
            const res = await axios.get('/admin/company')
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)


const initialState = {
    companies:[],
    copyCompanies:[],
    companiesLength:[]
}

const adminCompanySlice = createSlice({
    name: "companies",
    initialState,
    reducers:{
        filterByValue(state, {payload}){
            state.companies = state.copyCompanies.filter(company => company.name.toLowerCase().includes(payload.toLowerCase()))
        }
    },
    extraReducers:{
        [fetchAdminCompanies.pending]:(state)=>{
            state.status="pending"
        },
        [fetchAdminCompanies.fulfilled]:(state,{payload})=>
        {
          state.companies=payload
          state.copyCompanies=payload
          state.companiesLength=payload.length
          state.status="fulfilled"
        },
        [fetchAdminCompanies.rejected]:(state)=>
        {
         state.status="rejected"
        } 
    }
})


export const adminCompanyActions = adminCompanySlice.actions;
export default adminCompanySlice.reducer