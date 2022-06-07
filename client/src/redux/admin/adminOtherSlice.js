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
    others:[],
    othersCopy:[],
    othersLength:[]
}

const adminOtherSlice = createSlice({
    name: "others",
    initialState,
    reducers:{
        filterByValue(state, {payload}){
            state.others = state.othersCopy.filter(other => other.name.toLowerCase().includes(payload.toLowerCase()))
        }
    },
    extraReducers:{
        [fetchAdminOthers.pending]:(state)=>{
            state.status="pending"
        },
        [fetchAdminOthers.fulfilled]:(state,{payload})=>
        {
          state.others=payload
          state.othersCopy=payload
          state.othersLength=payload.length
          state.status="fulfilled"
        },
        [fetchAdminOthers.rejected]:(state)=>
        {
         state.status="rejected"
        } 
    }
})


export const adminOtherActions = adminOtherSlice.actions;
export default adminOtherSlice.reducer