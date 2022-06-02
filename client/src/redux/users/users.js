import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchUser=createAsyncThunk('users/fetchUser',
async(id)=>{
    try {
        const res=await axios.get(`http://localhost:3001/users/${id}`)
        return res.data
        
    } catch (error) {
        console.log(error)
    }
}
)
export const fetchUsers=createAsyncThunk('users/fetchUser',
async()=>{
    try {
        const res=await axios.get(`http://localhost:3001/users/`)
      
        return res.data
        
    } catch (error) {
        console.log(error)
    }
}
)

const initialState = {
    user: {},
    users:[]
}

export const usersSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        
    },
    extraReducers:{
        [fetchUser.pending]:(state)=>{
            state.status="pending"
        },
        [fetchUser.fulfilled]:(state,{payload})=>
        {
          state.users=payload
          state.user=payload
          state.status="fulfilled"
        },
        [fetchUser.rejected]:(state)=>
        {
         state.status="rejected"
        }   
 }
})

export const fetchActions=fetchUsers.actions
export default usersSlice.reducer