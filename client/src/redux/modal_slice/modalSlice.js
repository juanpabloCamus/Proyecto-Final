import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    activeLoginModal: null,
    activeRegisterModal: null,
    activeApplyModal: null,
    editOffer: null,
    editDelete: null,
    editReactive: null,
    estado: false,
    editDevExp: null,
    editDevEdu: null,
    premiumModal: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,

    reducers:{
        setModalValue( state ){
           state.isOpen = !state.isOpen;
        },
        activateLoginModal(state, {payload}){
            state.activeLoginModal = payload;
        },
        activateRegisterModal(state, {payload}){
            state.activeRegisterModal = payload;
        },
        activeApplyModal(state, {payload}){
            state.activeApplyModal = payload;
        },
        activateEdit(state, {payload}){
            state.editOffer = payload
        },
        activateDelete(state, {payload}){
            state.editDelete = payload
        },
        activateReactive(state, {payload}){
            state.editReactive = payload
        },
        setEstado(state){
            state.estado = !state.estado
        },
        activateEditDevExp(state, {payload}){
            state.editDevExp = payload
        },
        activateEditDevEdu(state, {payload}){
            state.editDevEdu = payload
        },
        activatePremium(state, {payload}){
            state.premiumModal = payload
        }
    }
})


export const modalActions = modalSlice.actions;
export default modalSlice.reducer;