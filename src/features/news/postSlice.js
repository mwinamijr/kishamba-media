import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";

// CREATE post
export const createPost = createAsyncThunk(
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
      const response = await axios.post(
        `${nodejsUrl}/api/posts`,
        postData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create post"
      );
    }
  }
);

// FETCH all posts
export const fetchPosts = createAsyncThunk(
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
      const response = await axios.get(`${nodejsUrl}/api/posts`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

// GET post details
export const fetchPostDetails = createAsyncThunk(
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
      const response = await axios.get(`${nodejsUrl}/api/posts/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load post"
      );
    }
  }
);

// UPDATE post
export const updatePost = createAsyncThunk(
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
      console.log(updatedData);
      const response = await axios.put(
        `${nodejsUrl}/api/posts/${id}`,
        updatedData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update post"
      );
    }
  }
);

// DELETE post
export const deletePost = createAsyncThunk(
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
      const response = await axios.delete(
        `${nodejsUrl}/api/posts/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete post"
      );
    }
  }
);

const initialState = {
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
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
        state.successMessage = "Post created successfully";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Post updated successfully";
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Post deleted successfully";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = postSlice.actions;

export default postSlice.reducer;
