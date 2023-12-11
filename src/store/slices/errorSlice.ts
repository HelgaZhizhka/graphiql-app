import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorMessage: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.errorMessage = '';
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
