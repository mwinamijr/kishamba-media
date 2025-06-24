import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";

interface UserInfo {
  token: string;
  username?: string;
  email?: string;
  // add other user info fields returned by your API
}

interface AuthState {
  userInfo: UserInfo | null;
  user?: any; // for registered user data, adjust type if you want
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  successMessage?: string;
}

interface Credentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  // add other registration fields
}

interface SuperUserData {
  username: string;
  email: string;
  password: string;
  // add other superuser fields
}

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? (JSON.parse(localStorage.getItem("userInfo")!) as UserInfo)
  : null;

export const loginUser = createAsyncThunk<
  UserInfo,
  Credentials,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<UserInfo>(
      `${nodejsUrl}/api/auth/login`,
      credentials
    );

    localStorage.setItem("userInfo", JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const createSuperUser = createAsyncThunk<
  { message: string },
  SuperUserData,
  { rejectValue: string }
>("users/createSuperUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ message: string }>(
      `${nodejsUrl}/api/auth/superuser`,
      userData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Superuser creation failed"
    );
  }
});

export const registerUser = createAsyncThunk<
  UserInfo,
  RegisterData,
  { rejectValue: string }
>("users/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<UserInfo>(
      `${nodejsUrl}/api/auth/register`,
      userData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "User registration failed"
    );
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("userInfo");
  return null;
});

const initialState: AuthState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
  isAuthenticated: !!userInfoFromStorage,
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
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.loading = false;
          state.userInfo = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      // createSuperUser
      .addCase(createSuperUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSuperUser.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(createSuperUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Superuser creation failed";
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.loading = false;
          state.userInfo = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "User registration failed";
      })

      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
