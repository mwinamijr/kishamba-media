import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";

export const uploadImage = createAsyncThunk(
  "imageUpload/uploadImage",
  async ({ imageFile, title }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      if (title) formData.append("title", title);

      const response = await axios.post(
        `${nodejsUrl}/api/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Upload failed");
    }
  }
);

const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState: {
    imageUrl: null,
    filename: null,
    loading: false,
    error: null,
    successUpload: false,
  },
  reducers: {
    clearUpload(state) {
      state.imageUrl = null;
      state.filename = null;
      state.loading = false;
      state.error = null;
      state.successUpload = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.successUpload = true;
        state.imageUrl = action.payload.url;
        state.filename = action.payload.filename;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUpload } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
