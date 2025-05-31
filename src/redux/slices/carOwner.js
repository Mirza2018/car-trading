import { createSlice } from "@reduxjs/toolkit";

const initialState = { carOwnerInfo: null };

const carOwner = createSlice({
  name: "carowner",
  initialState,
  reducers: {
    setCarOwnerInfo: (state, action) => {
      state.carOwnerInfo = action.payload;
    },
    clearCarOwnerInfo: (state) => {
      state.carOwnerInfo = null;
    },
  },
});

export const { setCarOwnerInfo,clearCarOwnerInfo } = carOwner.actions;
export default carOwner.reducer;
