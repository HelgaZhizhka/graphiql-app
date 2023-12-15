import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IntrospectionQuery } from 'graphql';

import { introspectionQuery } from './introspectionQuery';

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    fetchSchema: builder.query({
      query: (apiUrl) => ({
        url: apiUrl,
        method: 'POST',
        body: {
          operationName: 'IntrospectionQuery',
          query: introspectionQuery,
          variables: {},
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (response: { data: IntrospectionQuery }) => {
        return response.data;
      },
    }),
    sendQuery: builder.mutation({
      query: ({ apiUrl, query, variables = {}, operationName = null }) => ({
        url: apiUrl,
        method: 'POST',
        body: {
          operationName,
          variables,
          query,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useFetchSchemaQuery, useLazyFetchSchemaQuery, useSendQueryMutation } = apiService;
