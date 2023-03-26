import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    selectedPost: null,
  },
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    }
  },
});

export const {
  selectPost
} = postSlice.actions;

export const selectOpenPost = (state) => state.post.selectedPost;

export default postSlice.reducer;