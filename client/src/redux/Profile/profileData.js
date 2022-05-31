import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    userData: []
}


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        profileReducer(state, action){
            state.userData = action.payload
        }
    }
})


export const authActions = profileSlice.actions
export default profileSlice.reducer