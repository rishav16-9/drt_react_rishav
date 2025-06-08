import { configureStore } from "@reduxjs/toolkit";
import satelliteSlice from "./slices/satelliteSlice";
export const store = configureStore({
  reducer: {
    satelliteData: satelliteSlice,
  }, // Add your reducers here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
