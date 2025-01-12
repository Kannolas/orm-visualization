import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  is_open: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    openFilter: (state) => {
      state.is_open = !state.is_open;
    },
    addFilter: (state, action) => {
      const { params } = action.payload;

      state.value = params;
    },
    removeFilter: (state, action) => {
      state.value = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { openFilter, addFilter, removeFilter } = filterSlice.actions;

export default filterSlice.reducer;
