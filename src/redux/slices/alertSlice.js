import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: false,
  desc: null,
  error: false,
  errorinfo: false,
  alerts: [],
  index: 0,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    open: (state, action) => {
      const { error, desc, errorinfo } = action.payload;

      // state.index = state.alerts.length + 1;
      state.index = state.index + 1;

      const newAlert = {
        id: state.index,
        error: error,
        desc: desc,
        errorinfo: errorinfo,
      };

      if (state.alerts.length >= 5) {
        state.alerts.shift();
      }

      state.alerts.push(newAlert);
    },
    close: (state, action) => {
      const idToDelete = action.payload;

      state.alerts = state.alerts.filter((item) => item.id !== idToDelete);
    },
    closeAll: (state) => {
      state.alerts = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, closeAll } = alertSlice.actions;

export default alertSlice.reducer;
