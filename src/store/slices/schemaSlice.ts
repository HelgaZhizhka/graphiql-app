import { buildClientSchema, printSchema, IntrospectionQuery } from 'graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Writable } from '@/utils/types';

interface SchemaState {
  schema: Writable<IntrospectionQuery>;
  printSchema: string;
}

const initialState: SchemaState = {
  schema: {} as Writable<IntrospectionQuery>,
  printSchema: '',
};

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setSchema: (state, action: PayloadAction<Writable<IntrospectionQuery>>) => {
      state.schema = action.payload;
      const buildedSchema = buildClientSchema(state.schema);
      state.printSchema = printSchema(buildedSchema);
    },
    clearSchema: (state) => {
      state.schema = {} as Writable<IntrospectionQuery>;
      state.printSchema = '';
    },
  },
});

export const { setSchema, clearSchema } = schemaSlice.actions;
export default schemaSlice.reducer;
