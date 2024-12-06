import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { apiSlice } from "./api/apiSlice";
import { loginSlice } from "./features/Login/loginSlice";

const store = configureStore({
  reducer: {
    ...rootReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    login:loginSlice
  },
  //devTools: false,
  middleware: (getDefaultMiddleware) => {
    const middleware = [...getDefaultMiddleware(), apiSlice.middleware];
    return middleware;
  },
});

export default store;
