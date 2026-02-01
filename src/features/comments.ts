/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

const initialState: State = {
  comments: [],
  loading: false,
  error: '',
};

type State = {
  comments: Comment[];
  loading: boolean;
  error: string;
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })

      .addCase(init.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })

      .addCase(init.rejected, state => {
        state.loading = false;
        state.error = 'Error';
      })

      .addCase(delComment.pending, state => {
        state.loading = true;
      })

      .addCase(delComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
        state.loading = false;
      })

      .addCase(delComment.rejected, state => {
        state.loading = false;
        state.error = 'Error';
      })

      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
