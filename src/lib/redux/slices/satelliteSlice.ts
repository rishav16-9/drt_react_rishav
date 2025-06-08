import { Satellite } from "@/modules/home/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SatelliteState {
  data: Satellite[];
}

const initialState: SatelliteState = {
  data: [],
};

const satelliteSlice = createSlice({
  name: "satellitedata",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Satellite>) => {
      const alreadyExists = state.data.some(
        (sat) => sat.noradCatId === action.payload.noradCatId
      );
      if (!alreadyExists) {
        state.data.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<Satellite>) => {
      state.data = state.data.filter(
        (ele) => ele.noradCatId !== action.payload.noradCatId
      );
    },
    removeAll: (state) => {
      state.data = [];
    },
  },
});

export const { add, remove, removeAll } = satelliteSlice.actions;
export default satelliteSlice.reducer;
