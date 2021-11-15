import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  code: undefined,
  place: [],
  amenity: [],
  listingList: [],
};

const listingSlice = createSlice({
  name: "listing",
  initialState: initState,
  reducers: {
    doGetPlace() {},
    doGetAmenity() {},
  },
});

export const { doGetPlace, doGetAmenity } = listingSlice.actions;

export default listingSlice.reducer;
