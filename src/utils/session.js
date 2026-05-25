import { vendorApi } from '../api/vendorApi';
import { authApi } from '../api/authApi';
import { logout } from '../features/auth/authSlice';

/** Clear auth + RTK Query cache so another vendor login does not see stale data. */
export const clearVendorSession = (dispatch) => {
  dispatch(vendorApi.util.resetApiState());
  dispatch(authApi.util.resetApiState());
  dispatch(logout());
};

/** Drop cached API data before a new login (keeps existing token until setCredentials). */
export const resetVendorApiCache = (dispatch) => {
  dispatch(vendorApi.util.resetApiState());
  dispatch(authApi.util.resetApiState());
};
