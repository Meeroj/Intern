import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: false,
    submit: false,
  },
  reducers: {
    authOut: (state) => {
      state.data = false;
    },
    authIn: (state) => {
      state.data = true;
    },
    submitOn: (state) => {
      state.submit = true;
    },
    submitOff: (state) => {
      state.submit = false;
    },
  },
});

export const { authIn, authOut, submitOn, submitOff } = authSlice.actions;

export default authSlice.reducer;
