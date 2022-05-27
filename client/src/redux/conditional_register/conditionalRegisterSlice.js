import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profileType: '', 
}

const conditionalRegisterSlice = createSlice({
    name: 'conditionalRegister',
    initialState,

    reducers:{
        setConditionalRegister( state, {payload} ){
           if(payload === 'dev'){
               state.profileType = 'dev'
           }

           if(payload === 'com'){
            state.profileType = 'com'
        }
        }
    }
})


export const conditionalRegActions = conditionalRegisterSlice.actions;
export default conditionalRegisterSlice.reducer;