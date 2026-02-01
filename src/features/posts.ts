/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState: State = {
  posts: [],
  loading: false,
  error: '',
};

type State = {
  posts: Post[];
  loading: boolean;
  error: string;
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
        state.loading = true;
      })

      .addCase(init.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })

      .addCase(init.rejected, state => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
