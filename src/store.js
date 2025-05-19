import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/users/authSlice";
import userReducer from "./features/users/userSlice";
import postReducer from "./features/news/postSlice";
import articleReducer from "./features/news/articleSlice";
import imageUploadReducer from "./features/images/imageUploadSlice";
import fetchImagesReducer from "./features/images/fetchImages";

const store = configureStore({
  reducer: {
    auth: authReducer,
    getUsers: userReducer,
    getPosts: postReducer,
    getArticles: articleReducer,
    imageUpload: imageUploadReducer,
    fetchImages: fetchImagesReducer,
  },
});

export default store;
