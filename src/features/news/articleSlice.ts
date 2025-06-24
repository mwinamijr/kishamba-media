// features/articles/articleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { nodejsUrl } from "../utils";
import type { RootState } from "../../app/store"; // Adjust import path if needed

// Define Article interface based on your API response
export interface Article {
  id: string | number;
  title: string;
  content: string;
  author?: string;
  // add other fields your article has
}

interface ArticleCreateUpdateData {
  title: string;
  content: string;
  // add other fields used for create/update
}

// Helper to extract error message from AxiosError
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return String(error);
};

// CREATE article
export const createArticle = createAsyncThunk<
  Article,
  ArticleCreateUpdateData,
  { state: RootState; rejectValue: string }
>(
  "articles/createArticle",
  async (articleData, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.post<Article>(
        `${nodejsUrl}/api/articles`,
        articleData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// FETCH all articles
export const fetchArticles = createAsyncThunk<
  Article[],
  void,
  { state: RootState; rejectValue: string }
>(
  "articles/fetchArticles",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get<Article[]>(`${nodejsUrl}/api/articles`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET article details
export const getArticleDetails = createAsyncThunk<
  Article,
  string | number,
  { state: RootState; rejectValue: string }
>(
  "articles/getArticleDetails",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get<Article>(`${nodejsUrl}/api/articles/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// UPDATE article
export const updateArticle = createAsyncThunk<
  Article,
  { id: string | number; articleData: ArticleCreateUpdateData },
  { state: RootState; rejectValue: string }
>(
  "articles/updateArticle",
  async ({ id, articleData }, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.put<Article>(`${nodejsUrl}/api/articles/${id}`, articleData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// DELETE article
export const deleteArticle = createAsyncThunk<
  { message: string },
  string | number,
  { state: RootState; rejectValue: string }
>(
  "articles/deleteArticle",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.delete<{ message: string }>(`${nodejsUrl}/api/articles/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

interface ArticlesState {
  articles: Article[];
  article: Article | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ArticlesState = {
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
      // createArticle
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.loading = false;
        state.article = action.payload;
        state.successMessage = "Article created successfully";
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create article";
      })

      // fetchArticles
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch articles";
      })

      // getArticleDetails
      .addCase(getArticleDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticleDetails.fulfilled, (state, action: PayloadAction<Article>) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(getArticleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load article";
      })

      // updateArticle
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.loading = false;
        state.successMessage = "Article updated successfully";
        // Optionally update article in articles list
        const index = state.articles.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.articles[index] = action.payload;
        state.article = action.payload;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update article";
      })

      // deleteArticle
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Article deleted successfully";
        // Optionally clear article or remove from articles array
        state.article = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete article";
      });
  },
});

export const { clearMessages } = articleSlice.actions;

export default articleSlice.reducer;
