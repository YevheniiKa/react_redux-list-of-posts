/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type SliceState<T> = {
  comments: T[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: SliceState<Comment> = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetchByPost', (postId: number) =>
  getPostComments(postId),
);

export const delComment = createAsyncThunk(
  'comments/deleteById',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.comments = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.hasError = true;
      })

      .addCase(delComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(delComment.rejected, state => {
        state.hasError = true;
      })

      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addNewComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
