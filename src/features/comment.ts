/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  body: '',
  loading: false,
  error: '',
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setBody: (state, action) => {
      state.body = action.payload;
    },
  },
});

export const { setName, setEmail, setBody } = commentSlice.actions;
export default commentSlice.reducer;
