import { createSlice } from "@reduxjs/toolkit";


export const CurrentUserSlice = createSlice({
    name:"userLogin",
    initialState:[],
    reducers:{
        addUser:(state,action) => {
            state.push(action.payload);
           
        },
        removeUser:(state) => {
           state.pop()
        },
    }
});


export const {addUser, removeUser} = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;