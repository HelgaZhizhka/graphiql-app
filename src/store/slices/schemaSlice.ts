import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SchemaState {
  schema: unknown;
  isLoading: boolean;
  error: string | null;
}

const initialState: SchemaState = {
  schema: null,
  isLoading: false,
  error: null,
};

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setSchema: (state, action: PayloadAction<unknown>) => {
      state.schema = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setSchema } = schemaSlice.actions;
export default schemaSlice.reducer;
