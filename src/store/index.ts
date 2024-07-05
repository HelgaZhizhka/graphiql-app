import { configureStore } from '@reduxjs/toolkit';

import { apiService } from './api/apiService';
import messageReducer from './slices/messageSlice';
import schemaReducer from './slices/schemaSlice';

const store = configureStore({
  reducer: {
    message: messageReducer,
    schema: schemaReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
