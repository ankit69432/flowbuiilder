import { configureStore } from "@reduxjs/toolkit";
import idSlice from "./idSlice";
import insertNode from "./nodesSlice";
const store = configureStore({
  reducer: {
    id: idSlice,
    insertNode: insertNode,
  },
});

export default store;
