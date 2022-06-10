import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchUser=createAsyncThunk('users/fetchUser',
async(id)=>{
    try {
        const res=await axios.get(`/users/${id}`)
        return res.data
        
    } catch (error) {
        console.log(error)
    }
}
)
export const fetchUsers=createAsyncThunk('users/fetchUser',
async()=>{
    try {
        const res=await axios.get(`/users/`)
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
        // filterByValue(state, {payload}){
        //     state.users = state.users[0].offers.filter(user => user.fullName.includes(payload))
        // }
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