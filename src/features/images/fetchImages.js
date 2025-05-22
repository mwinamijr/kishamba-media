// features/images/imageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";

export const fetchImages = createAsyncThunk("images/fetch", async () => {
  const res = await axios.get(`${nodejsUrl}/api/images`);
  return res.data.images;
});

export const updateImage = createAsyncThunk(
  "images/update",
  async ({ id, title }) => {
    const res = await axios.put(`${nodejsUrl}/api/images/${id}`, { title });
    return res.data.image;
  }
);

export const deleteImage = createAsyncThunk("images/delete", async (id) => {
  await axios.delete(`${nodejsUrl}/api/images/${id}`);
  return id;
});

const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    loading: false,
    error: null,
    imageUpdated: null,
    deletedImageId: null,
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
      })
      .addCase(updateImage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedImage = action.payload;
      })
      .addCase(updateImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteImage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedImageId = action.payload;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;
