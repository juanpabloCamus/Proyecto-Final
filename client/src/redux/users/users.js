import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchUsers=createAsyncThunk('users/fetchUsers',
async()=>{
    try {
        const res=await axios.get('http://localhost:3001/users')
        console.log(res)
        return res.data
        
    } catch (error) {
        console.log(error)
    }
}
)


const initialState = {
    users: []
}

export const usersSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        
    },
    extraReducers:{
        [fetchUsers.pending]:(state)=>{
            state.status="pending"
        },
        [fetchUsers.fulfilled]:(state,{payload})=>
        {
          state.users=payload
          state.status="fulfilled"
        },
        [fetchUsers.rejected]:(state)=>
        {
         state.status="rejected"
        }   
 }
})

export const fetchActions=fetchUsers.actions
export default usersSlice.reducer