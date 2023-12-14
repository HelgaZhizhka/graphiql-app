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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setSchema, setLoading, setError } = schemaSlice.actions;
export default schemaSlice.reducer;
