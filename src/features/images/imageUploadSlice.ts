import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";

interface UploadImageArgs {
  imageFile: File;
  title?: string;
}

interface UploadResponse {
  url: string;
  filename: string;
  // Add other response fields if any
}

interface ImageUploadState {
  imageUrl: string | null;
  filename: string | null;
  loading: boolean;
  error: string | null;
  successUpload: boolean;
}

export const uploadImage = createAsyncThunk<
  UploadResponse,
  UploadImageArgs,
  { rejectValue: string }
>(
  "imageUpload/uploadImage",
  async ({ imageFile, title }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      if (title) formData.append("title", title);

      const response = await axios.post<UploadResponse>(
        `${nodejsUrl}/api/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (err: any) {
      // err might not have response or data, so safe check
      return rejectWithValue(err.response?.data?.error || "Upload failed");
    }
  }
);

const initialState: ImageUploadState = {
  imageUrl: null,
  filename: null,
  loading: false,
  error: null,
  successUpload: false,
};

const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState,
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
      .addCase(
        uploadImage.fulfilled,
        (state, action: PayloadAction<UploadResponse>) => {
          state.loading = false;
          state.successUpload = true;
          state.imageUrl = action.payload.url;
          state.filename = action.payload.filename;
        }
      )
      .addCase(
        uploadImage.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Upload failed";
        }
      );
  },
});

export const { clearUpload } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
