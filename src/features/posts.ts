/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState: State = {
  posts: [],
  loaded: false,
  hasError: false,
};

type State = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

export const init = createAsyncThunk('posts/fetchByUser', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })

      .addCase(init.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = false;
        state.hasError = false;
      })

      .addCase(init.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
