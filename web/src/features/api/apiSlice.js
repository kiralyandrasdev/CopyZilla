import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7107/api", headers: {
            'Content-Type': 'application/json',
        }
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: ({ firebaseUid }) => ({
                url: `/user/${firebaseUid}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/user',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        processQuickPrompt: builder.mutation({
            query: (quickPrompt) => ({
                url: '/api/quickPrompt',
                method: 'POST',
                body: quickPrompt,
            }),
            invalidatesTags: ['User'],
        }),
        processAdvancedPrompt: builder.mutation({
            query: (advancedPrompt) => ({
                url: '/api/advancedPrompt',
                method: 'POST',
                body: advancedPrompt,
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useProcessQuickPromptMutation,
    useProcessAdvancedPromptMutation,
} = apiSlice;

export default apiSlice;