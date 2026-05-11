import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { vendorApi } from '../api/vendorApi';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, vendorApi.middleware),
});
