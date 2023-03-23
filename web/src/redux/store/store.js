import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../../features/api/apiSlice";
import { authSlice } from "../../features/authentication/authSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});