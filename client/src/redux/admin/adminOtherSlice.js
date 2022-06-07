import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminOthers = createAsyncThunk('adminOtherSlice/fetchAdminOthers',

    async()=>{
        try {
            const res = await axios.get('/admin/others')
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)


const initialState = {
    others:[]
}

const adminOtherSlice = createSlice({
    name: "others",
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchAdminOthers.pending]:(state)=>{
            state.status="pending"
        },
        [fetchAdminOthers.fulfilled]:(state,{payload})=>
        {
          state.others=payload
          state.status="fulfilled"
        },
        [fetchAdminOthers.rejected]:(state)=>
        {
         state.status="rejected"
        } 
    }
})


export const adminJobActions = adminOtherSlice.actions;
export default adminOtherSlice.reducer