import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    
    changeAvatar: (state, action) => {
       state.avatar = action.payload;
       return state
    },
    logout: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, changeAvatar } = userSlice.actions;
export default userSlice.reducer;
