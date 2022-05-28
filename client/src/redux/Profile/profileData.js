import { createSlice } from '@reduxjs/toolkit'


const initialState = []


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        profileReducer(state, action){
            state.push(action.payload)
        }
    }
})


export const authActions = profileSlice.actions
export default profileSlice.reducer