import { configureStore } from "@reduxjs/toolkit";
import { ormApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";
import alertReducer from "./slices/alertSlice";
import filterReducer from "./slices/filterSlice"

// import alertReducer1 from "./api";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    filter: filterReducer,
    [ormApi.reducerPath]: ormApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ormApi.middleware),
});

setupListeners(store.dispatch);
