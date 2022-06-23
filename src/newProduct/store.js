import { configureStore } from "@reduxjs/toolkit";
import newProductSlice from "./newProductSlice";
export default configureStore({
  reducer: {
    data: newProductSlice,
  },
});
