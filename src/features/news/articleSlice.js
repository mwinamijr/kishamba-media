import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";

// CREATE article
export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (articleData, { getState, rejectWithValue }) => {
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
        `${nodejsUrl}/api/articles`,
        articleData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create article"
      );
    }
  }
);

// FETCH all articles
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
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
      const response = await axios.get(`${nodejsUrl}/api/articles`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch articles"
      );
    }
  }
);

// GET article details
export const getArticleDetails = createAsyncThunk(
  "articles/getArticleDetails",
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
      const response = await axios.get(
        `${nodejsUrl}/api/articles/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load article"
      );
    }
  }
);

// UPDATE article
export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async ({ id, articleData }, { getState, rejectWithValue }) => {
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
      const response = await axios.put(
        `${nodejsUrl}/api/articles/${id}`,
        articleData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update article"
      );
    }
  }
);

// DELETE article
export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
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
        `${nodejsUrl}/api/articles/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete article"
      );
    }
  }
);

const initialState = {
  articles: [],
  article: null,
  loading: false,
  error: null,
  successMessage: null,
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
        state.successMessage = "Article created successfully";
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getArticleDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticleDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(getArticleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Article updated successfully";
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Article deleted successfully";
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = articleSlice.actions;

export default articleSlice.reducer;
