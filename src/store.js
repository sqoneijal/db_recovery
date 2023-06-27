import { configureStore } from "@reduxjs/toolkit";
import action from "./action";

export default configureStore({
   reducer: {
      action: action,
   },
});
