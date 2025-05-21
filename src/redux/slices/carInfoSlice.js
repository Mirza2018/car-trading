import { createSlice } from "@reduxjs/toolkit";

const initialState = { carLicenseInfo: null };

const carInfoSlice = createSlice({
  name: "carInfo",
  initialState,
  reducers: {
    setCarLicenseInfo: (state, action) => {
      state.carLicenseInfo = action.payload;
    },
    clearCarLicenseInfo: (state) => {
      state.carLicenseInfo = null;
    },
  },
});

export const { setCarLicenseInfo, clearCarLicenseInfo } = carInfoSlice.actions;
export default carInfoSlice.reducer;
