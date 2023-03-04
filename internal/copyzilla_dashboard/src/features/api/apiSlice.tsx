import React from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config/envConfig';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as any;
            if (state.auth && state.auth.token) {
                headers.set('Authorization', `Bearer ${state.auth.token}`);
            }
            return headers;
        },
        baseUrl: apiUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            transformResponse: (response: any) => {
                return response.value;
            },
            transformErrorResponse: (response: any) => {
                console.log(response);
                return response.errorMessage;
            }
        }),
        getLogs: builder.query({
            query: ({ type }: { type: string }) => ({
                url: `/logs/${type}`,
                method: 'GET',
            }),
            transformResponse: (response: any) => {
                return response.value;
            },
            transformErrorResponse: (response: any) => {
                return response.errorMessage;
            }
        }),
        downloadLog: builder.query({
            query: ({ type, fileName }: { type: string, fileName: string }) => ({
                url: `/logs/${type}/${fileName}`,
                method: 'GET',
            }),
            transformResponse: (response: any) => {
                return response.value;
            },
            transformErrorResponse: (response: any) => {
                return response.errorMessage;
            },
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetLogsQuery,
    useDownloadLogQuery,
} = apiSlice;
