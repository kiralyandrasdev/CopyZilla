import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../config/envConfig';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            const email = getState().auth.email;

            headers.set("X-Client-Type", "web");

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            if(email) {
                headers.set('X-User-Email', email);
            }
            
            return headers;
        },
        baseUrl: apiBaseUrl,
        headers: {
            'Content-Type': 'application/json',
        }
    }),
    tagTypes: ['User', "PromptResults", "EmailTemplates"],
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
                return response.errorMessage;
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
                return response.errorMessage;
            },
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ({userId, user }) => ({
                url: `/user/${userId}`,
                method: 'PATCH',
                body: user
            }),
            transformErrorResponse: (response) => {
                console.log(response);
                return response.data.errorMessage;
            },
            // invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: ({ userId }) => ({
                url: `/user/${userId}`,
                method: 'DELETE',
            }),
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
        getEmailTemplates: builder.query({
            query: ({ userId }) => ({
                url: `/user/${userId}/templates`,
                method: 'GET',
            }),
            providesTags: ['EmailTemplates'],
            transformResponse: (response) => {
                return response.value;
            },
            transformErrorResponse: (response) => {
                console.log(response);
                return response.errorMessage;
            }
        }),
        saveEmailTemplate: builder.mutation({
            query: ({ userId, template }) => ({
                url: `/user/${userId}/templates`,
                method: 'POST',
                body: template,
            }),
            invalidatesTags: ['EmailTemplates'],
        }),
        updateEmailTemplate: builder.mutation({
            query: ({ userId, template }) => ({
                url: `/user/${userId}/templates/${template.id}`,
                method: 'PATCH',
                body: template,
            }),
            invalidatesTags: ['EmailTemplates'],
        }),
        deleteEmailTemplate: builder.mutation({
            query: ({ userId, templateId }) => ({
                url: `/user/${userId}/templates/${templateId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['EmailTemplates'],
        }),
    }),
})

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useProcessQuickPromptMutation,
    useProcessAdvancedPromptMutation,
    useGetPromptResultsQuery,
    useSavePromptResultMutation,
    useDeletePromptResultMutation,
    useGetEmailTemplatesQuery,
    useSaveEmailTemplateMutation,
    useUpdateEmailTemplateMutation,
    useDeleteEmailTemplateMutation,
} = apiSlice;

export default apiSlice;