import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/users';
import userReducer from '../features/user';
import postsReducer from '../features/posts';
import postReducer from '../features/post';
import commentsReducer from '../features/comments';
import commentReducer from '../features/comment';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer,
    comment: commentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
