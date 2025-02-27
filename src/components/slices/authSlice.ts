import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
  password: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  username: "",
  password: "",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ username: string }>) => {
      state.loading = false;
      state.error = null;
      state.username = action.payload.username;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
