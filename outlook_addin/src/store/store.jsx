import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

export default configureStore({
    reducer: {
        // auth: authSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        // promptResults: promptResultsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});