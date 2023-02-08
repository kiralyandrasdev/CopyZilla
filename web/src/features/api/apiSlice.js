import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7107/api", headers: {
            'Content-Type': 'application/json',
        }
    }),
    tagTypes: ['User', "PromptResults"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: ({ firebaseUid }) => ({
                url: `/user/${firebaseUid}`,
                method: 'GET',
            }),
            providesTags: ['User'],
            transformResponse: (response) => {
                return response.value;
            },
            transformErrorResponse: (response) => {
                console.log(response);
                return response.data;
            }
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/user',
                method: 'POST',
                body: user,
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response.data;
            },
            invalidatesTags: ['User'],
        }),
        processQuickPrompt: builder.mutation({
            query: (firebaseUid, prompt) => ({
                url: `/user/${firebaseUid}/quickPrompt`,
                method: 'POST',
                body: prompt,
            }),
            invalidatesTags: ['User'],
        }),
        processAdvancedPrompt: builder.mutation({
            query: ({ firebaseUid, prompt }) => ({
                url: `/user/${firebaseUid}/advancedPrompt`,
                method: 'POST',
                body: prompt,
            }),
            invalidatesTags: ['User'],
        }),
        savePromptResult: builder.mutation({
            query: ({ userId, promptResult }) => ({
                url: `/user/${userId}/promptResults`,
                method: 'POST',
                body: promptResult,
            }),
            invalidatesTags: ['PromptResults'],
        }),
        getPromptResults: builder.query({
            query: ({ userId }) => ({
                url: `/user/${userId}/promptResults`,
                method: 'GET',
            }),
            providesTags: ['PromptResults'],
            transformResponse: (response) => {
                return response.value;
            }
        }),
        deletePromptResult: builder.mutation({
            query: ({ userId, promptResultId }) => ({
                url: `/user/${userId}/promptResults/${promptResultId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PromptResults'],
        }),
        removePaidSubscription: builder.mutation({
            query: ({ userId }) => ({
                url: `/user/${userId}/removePaidSubscription`,
                method: 'POST',
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
    useGetPromptResultsQuery,
    useSavePromptResultMutation,
    useDeletePromptResultMutation,
    useRemovePaidSubscriptionMutation,
} = apiSlice;

export default apiSlice;