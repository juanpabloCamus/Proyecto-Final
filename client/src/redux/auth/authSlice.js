import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        getNewUser(state, {payload}){
            state.isLogged = payload
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer

