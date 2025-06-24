// features/posts/postSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";
import type { RootState } from "../../app/store"; // adjust import path to your store

// Define Post interface based on your API response
export interface Post {
  id: string | number;
  title: string;
  content: string;
  author?: string;
  // add other fields your post has
}

interface PostCreateUpdateData {
  title: string;
  content: string;
  // add other fields used for create/update
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return String(error);
};

// CREATE post
export const createPost = createAsyncThunk<
  Post,
  PostCreateUpdateData,
  { state: RootState; rejectValue: string }
>(
  "posts/createPost",
  async (postData, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.post<Post>(`${nodejsUrl}/api/posts`, postData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// FETCH all posts
export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { state: RootState; rejectValue: string }
>(
  "posts/fetchPosts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get<Post[]>(`${nodejsUrl}/api/posts`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET post details
export const fetchPostDetails = createAsyncThunk<
  Post,
  string | number,
  { state: RootState; rejectValue: string }
>(
  "posts/fetchPostDetails",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get<Post>(`${nodejsUrl}/api/posts/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// UPDATE post
export const updatePost = createAsyncThunk<
  Post,
  { id: string | number; updatedData: PostCreateUpdateData },
  { state: RootState; rejectValue: string }
>(
  "posts/updatePost",
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.put<Post>(`${nodejsUrl}/api/posts/${id}`, updatedData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// DELETE post
export const deletePost = createAsyncThunk<
  { message: string },
  string | number,
  { state: RootState; rejectValue: string }
>(
  "posts/deletePost",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.delete<{ message: string }>(`${nodejsUrl}/api/posts/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

interface PostsState {
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: PostsState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  successMessage: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.post = action.payload;
        state.successMessage = "Post created successfully";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create post";
      })

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch posts";
      })

      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load post";
      })

      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.successMessage = "Post updated successfully";
        // Optionally update post in posts list
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
        state.post = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update post";
      })

      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Post deleted successfully";
        state.post = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete post";
      });
  },
});

export const { clearMessages } = postSlice.actions;

export default postSlice.reducer;
