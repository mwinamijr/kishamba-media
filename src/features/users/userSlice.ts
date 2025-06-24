import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";
import type { RootState } from "../../app/store"; // adjust import to your store location
import { getAuthConfig } from "../../utils/authHeader";

// Define User interface according to your API response shape
export interface User {
  id: string | number;
  username: string;
  email: string;
  // add other user fields as needed
}

interface CreateUserData {
  username: string;
  email: string;
  password: string;
  // add other fields required for user creation
}

interface UpdateUserData {
  username?: string;
  email?: string;
  // add other fields allowed in update
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return String(error);
};

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { state: RootState; rejectValue: string }
>("users/fetchUsers", async (_, { getState, rejectWithValue }) => {
  try {
    const config = getAuthConfig(getState, rejectWithValue);
    if (!config) {
      return rejectWithValue("User is not authenticated");
    }
    const response = await axios.get<User[]>(
      `${nodejsUrl}/api/auth/users`,
      config
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Get single user details
export const getUserDetails = createAsyncThunk<
  User,
  string | number,
  { state: RootState; rejectValue: string }
>("users/getUserDetails", async (id, { getState, rejectWithValue }) => {
  try {
    const config = getAuthConfig(getState, rejectWithValue);
    if (!config) {
      return rejectWithValue("User is not authenticated");
    }
    const response = await axios.get<User>(
      `${nodejsUrl}/api/auth/users/${id}/profile`,
      config
    );
    console.log("dispatching .....");
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Create user
export const createUser = createAsyncThunk<
  User,
  CreateUserData,
  { state: RootState; rejectValue: string }
>("users/createUser", async (userData, { getState, rejectWithValue }) => {
  try {
    const config = getAuthConfig(getState, rejectWithValue);
    if (!config) {
      return rejectWithValue("User is not authenticated");
    }
    const response = await axios.post<User>(
      `${nodejsUrl}/api/auth/create`,
      userData,
      config
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Update user
export const updateUser = createAsyncThunk<
  User,
  { id: string | number; userData: UpdateUserData },
  { rejectValue: string }
>("users/updateUser", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const response = await axios.put<User>(
      `${nodejsUrl}/api/auth/users/${id}/profile`,
      userData
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Delete user
export const deleteUser = createAsyncThunk<
  { message: string },
  string | number,
  { rejectValue: string }
>("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete<{ message: string }>(
      `${nodejsUrl}/api/auth/users/${id}`
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

interface UsersState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  isAuthenticated?: boolean; // optionally include if relevant
}

const initialState: UsersState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch users";
      })

      // USER DETAILS
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserDetails.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "User details not found";
      })

      // CREATE USER
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "User registration failed";
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "User updated successfully";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Update failed";
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "User deleted successfully";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete failed";
      });
  },
});

export const { clearMessages } = userSlice.actions;

export default userSlice.reducer;
