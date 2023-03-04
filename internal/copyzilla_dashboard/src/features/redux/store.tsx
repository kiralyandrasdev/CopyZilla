import React from 'react'
import { apiSlice } from '../api/apiSlice'
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
        