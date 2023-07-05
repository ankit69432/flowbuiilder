import { createSlice } from "@reduxjs/toolkit";

const idslice = createSlice({
  name: "id",
  initialState: "",
  reducers: {
    setId(state, action) {
      return action.payload;
    },
  },
});

export const { setId } = idslice.actions;
export default idslice.reducer;
