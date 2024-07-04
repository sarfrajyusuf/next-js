import { createSlice } from "@reduxjs/toolkit";

// Slice
const initialState = { users: null };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUserState: (state, action) => {
      state.users = action.payload;
    },
    
    logoutState: (state) => {
      console.log("STATE =>");
      state.users = null;
    },
  },
});

export const { loginUserState, logoutState } = userSlice.actions;

export default userSlice.reducer;
