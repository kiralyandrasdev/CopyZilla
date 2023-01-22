import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../../features/api/apiSlice";
import { authSlice } from "../../features/authentication/authSlice";
import { editorSlice } from "../../features/editor/editorSlice";
import { promptResultsSlice } from "../../features/saved_results/promptResultsSlice";
import { userSlice } from "../../features/user/userSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        editor: editorSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        promptResults: promptResultsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});