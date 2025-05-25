import { createSlice } from "@reduxjs/toolkit";

const initialState = { offerCarInfo: null };

const offerCarInfoSlice = createSlice({
  name: "offerInfo",
  initialState,
  reducers: {
    setOfferCarInfo: (state, action) => {
      state.offerCarInfo = action.payload;
    },

  },
});

export const {setOfferCarInfo} = offerCarInfoSlice.actions;
export default offerCarInfoSlice.reducer;
