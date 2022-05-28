import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loggedUser: {},
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setLogin(state, {payload}){
            state.loggedUser = {
                ...payload,
                isLogged: true 
            }
        },
        setLogout(state){
            state.loggedUser = {
                isLogged: false 
            }
        }
    }
})


export const authActions = authSlice.actions
export default authSlice.reducer