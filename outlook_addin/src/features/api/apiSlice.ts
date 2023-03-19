import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from "../../config/envConfig";

type RephraseSelectionOptions = {
    text: string;
    objective: string;
}

type GenerateEmailOptions = {
    email?: string;
    objective?: string;
    tone?: string;
    instructions?: string;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        /* prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            const email = getState().auth.email;

            headers.set("X-Client-Type", "web");

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            if (email) {
                headers.set('X-User-Email', email);
            }

            return headers;
        }, */
        baseUrl: apiBaseUrl,
        headers: {
            'Content-Type': 'application/json',
        }
    }),
    tagTypes: ['User', 'Templates'],
    endpoints: (builder) => ({
        // Get user
        getUser: builder.query({
            query: ({ uid, token }) => ({
                url: `/user/${uid}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Client-Type': 'outlook add-in',
                },
            }),
            transformResponse: (response: any) => {
                return response.value;
            },
            transformErrorResponse: (response: any) => {
                return response.errorMessage ?? "Something went wrong while fetching your profile 😕";
            },
            providesTags: ['User'],
        }),
        // Get templates
        getTemplates: builder.query({
            query: ({ userId, token }) => ({
                url: `/user/${userId}/templates`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Client-Type': 'outlook add-in',
                },
            }),
            transformResponse: (response: any) => {
                return response.value;
            },
            transformErrorResponse: (response: any) => {
                return response.errorMessage ?? "Something went wrong while fetching your templates 😕";
            },
            providesTags: ['Templates'],
        }),
        // Rephrase selection
        rephraseSelection: builder.mutation({
            query: ({ userId, token, options }: { userId: string, token: string, options: RephraseSelectionOptions }) => ({
                url: `/user/${userId}/rephrasePrompt`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Client-Type': 'outlook add-in',
                },
                body: options,
            }),
            transformResponse: (response: any) => {
                return response.value;
            },
            transformErrorResponse: (response: any) => {
                return response.errorMessage ?? "Something went wrong while rephrasing your selection 😕";
            }
        }),
        // Generate email
        generateEmail: builder.mutation({
            query: ({ userId, token, options }: { userId: string, token: string, options: GenerateEmailOptions }) => ({
                url: `/user/${userId}/emailPrompt`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Client-Type': 'outlook add-in',
                },
                body: options,
            }),
            transformResponse: (response: any) => {
                return response.value;
            },
            transformErrorResponse: (response: any) => {
                return response.errorMessage ?? "Something went wrong while generating your email 😕";
            }
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetTemplatesQuery,
    useRephraseSelectionMutation,
    useGenerateEmailMutation,
} = apiSlice;