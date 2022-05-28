import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loggedUser:{}
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setIsLogged(state, {payload}){
            state.loggedUser = {...state.loggedUser, payload}
        }
    }
})


export const authActions = authSlice.actions
export default authSlice.reducer