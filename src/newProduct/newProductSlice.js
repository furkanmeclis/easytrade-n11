import { createSlice } from "@reduxjs/toolkit";
import { categories as c, categoryAttributes as b } from "../CategoryData";
export const newProductSlice = createSlice({
  name: "newProduct",
  initialState: {
    categories: c,
    selectedCategory: null,
    attributes: b,
    selectedAttributes: {},
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setAttributes: (state, action) => {
      state.attributes = action.payload;
    },
    setSelectedAttributes: (state, action) => {
      state.selectedAttributes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCategories,
  setSelectedCategory,
  setAttributes,
  setSelectedAttributes,
} = newProductSlice.actions;

export default newProductSlice.reducer;
