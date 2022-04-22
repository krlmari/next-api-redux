import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFetchPostsResponse } from "../../types/IPost";

export const fetchPosts = createAsyncThunk(
  "fetchPosts",
  async (params: { search?: string; type?: string } = {}, thunkAPI) => {
    try {
      const response = await axios.get<IFetchPostsResponse>(
        `https://dev.retnback.only.com.ru/api/news/list`,
        { params }
      );
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);
