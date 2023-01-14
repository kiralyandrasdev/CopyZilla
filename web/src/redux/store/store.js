import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../../features/api/apiSlice";
import { authSlice } from "../../features/authentication/authSlice";
import { editorSlice } from "../../features/editor/editorSlice";
import { userSlice } from "../../features/user/userSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        editor: editorSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});