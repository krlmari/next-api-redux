import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../types/IPost";
import { fetchPosts } from "./ActionCreators";

interface PostState {
  posts: IPost[];
  isLoading: boolean;
  error: string;
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  // extraReducers: {
  //   [fetchPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
  //     state.isLoading = false;
  //     state.error = "";
  //     state.posts = action.payload;
  //   },
  //   [fetchPosts.pending.type]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.isLoading = false;
        state.error = "";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
