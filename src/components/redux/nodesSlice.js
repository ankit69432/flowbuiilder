import { createSlice } from "@reduxjs/toolkit";

const nodes = createSlice({
  name: "nodes",
  initialState: [],
  reducers: {
    insertNode(state, action) {
      return state.push(action.payload);
    },
  },
});

export const { i9nsertNode } = nodes.actions;
export default nodes.reducer;
