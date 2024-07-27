import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categoryName",
  initialState: {
    category: "",
  },
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});


export const { changeCategory } = categorySlice.actions

export default categorySlice.reducer
