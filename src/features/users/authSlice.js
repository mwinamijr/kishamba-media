import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";

const userToken = localStorage.getItem("token");

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${nodejsUrl}/api/auth/login`,
        credentials
      );

      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const createSuperUser = createAsyncThunk(
  "users/createSuperUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${nodejsUrl}/api/auth/superuser`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Superuser creation failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${nodejsUrl}/api/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User registration failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  return null;
});

const initialState = {
  token: userToken || null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: !!userToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSuperUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSuperUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createSuperUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
