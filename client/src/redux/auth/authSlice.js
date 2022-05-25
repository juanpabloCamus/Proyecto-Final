import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    clientType: ''
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setClientType(state, { payload }){


            if(payload === 'developer'){
                state.clientType = payload
            }

            if(payload === 'company'){
                state.clientType = payload
            }
        }
    }
})


export const authActions = authSlice.actions
export default authSlice.reducer