import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { nodejsUrl } from "../utils";

interface Image {
  id: string | number;
  title: string;
  // Add other image fields if any, e.g. url, description, etc.
}

interface ImagesState {
  images: Image[];
  loading: boolean;
  error: string | null;
  updatedImage: Image | null;
  deletedImageId: string | number | null;
}

export const fetchImages = createAsyncThunk<Image[]>(
  "images/fetch",
  async () => {
    const res = await axios.get<{ images: Image[] }>(`${nodejsUrl}/api/images`);
    return res.data.images;
  }
);

export const updateImage = createAsyncThunk<
  Image,
  { id: string | number; title: string }
>("images/update", async ({ id, title }) => {
  const res = await axios.put<{ image: Image }>(
    `${nodejsUrl}/api/images/${id}`,
    { title }
  );
  return res.data.image;
});

export const deleteImage = createAsyncThunk<string | number, string | number>(
  "images/delete",
  async (id) => {
    await axios.delete(`${nodejsUrl}/api/images/${id}`);
    return id;
  }
);

const initialState: ImagesState = {
  images: [],
  loading: false,
  error: null,
  updatedImage: null,
  deletedImageId: null,
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchImages.fulfilled,
        (state, action: PayloadAction<Image[]>) => {
          state.loading = false;
          state.images = action.payload;
        }
      )
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch images";
      })
      .addCase(updateImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateImage.fulfilled, (state, action: PayloadAction<Image>) => {
        state.loading = false;
        state.updatedImage = action.payload;
        // Optionally update the image in images array
        const index = state.images.findIndex(
          (img) => img.id === action.payload.id
        );
        if (index !== -1) {
          state.images[index] = action.payload;
        }
      })
      .addCase(updateImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update image";
      })
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteImage.fulfilled,
        (state, action: PayloadAction<string | number>) => {
          state.loading = false;
          state.deletedImageId = action.payload;
          // Optionally remove the deleted image from images array
          state.images = state.images.filter(
            (img) => img.id !== action.payload
          );
        }
      )
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete image";
      });
  },
});

export default imageSlice.reducer;
