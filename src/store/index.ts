import { configureStore } from '@reduxjs/toolkit';

import errorReducer from './slices/errorSlice';

const store = configureStore({
  reducer: {
    error: errorReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
