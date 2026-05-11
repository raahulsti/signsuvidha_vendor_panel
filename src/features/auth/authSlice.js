import { createSlice } from '@reduxjs/toolkit';

const loadUser = () => {
  try {
    const user = localStorage.getItem('vendor_user');
    return user ? JSON.parse(user) : null;
  } catch { return null; }
};

const initialState = {
  user: loadUser(),
  token: localStorage.getItem('vendor_accessToken'),
  isAuthenticated: !!localStorage.getItem('vendor_accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = true;
      localStorage.setItem('vendor_user', JSON.stringify(user));
      localStorage.setItem('vendor_accessToken', accessToken);
      if (refreshToken) localStorage.setItem('vendor_refreshToken', refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('vendor_user');
      localStorage.removeItem('vendor_accessToken');
      localStorage.removeItem('vendor_refreshToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
