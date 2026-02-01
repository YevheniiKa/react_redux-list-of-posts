import { createSlice } from '@reduxjs/toolkit';
const initialState: number | null = null;

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
