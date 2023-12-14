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
          query: introspectionQuery,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (response: { data: IntrospectionQuery }) => {
        return response.data;
      },
    }),
  }),
});

export const { useFetchSchemaQuery, useLazyFetchSchemaQuery } = apiService;
