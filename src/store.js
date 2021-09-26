import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Redux/root";
import thunk from "redux-thunk";
const store = configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(thunk)
);

export default store;
