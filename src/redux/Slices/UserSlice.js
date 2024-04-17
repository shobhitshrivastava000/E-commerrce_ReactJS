import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"users",
    initialState : [],
    reducers:{
        setUser:(state,action) => {
            state.push(action.payload);
          
        },
    }
});


export const {setUser} = userSlice.actions;
export default userSlice.reducer;