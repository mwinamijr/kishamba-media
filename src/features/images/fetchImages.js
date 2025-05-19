// features/fetchImagesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";

// Async thunk to fetch images
export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
  try {
    const response = await axios.get(`${nodejsUrl}/uploads`);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch images");
  }
});

const fetchImagesSlice = createSlice({
  name: "fetchImages",
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchImagesSlice.reducer;
