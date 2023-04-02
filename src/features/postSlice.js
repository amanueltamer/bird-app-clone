import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    selectedPost: null,
    // prevPostId: null,
    prevPost: null,
  },
  reducers: {
    selectPost: (state, action) => {
      state.prevPost = state.selectedPost;
      state.selectedPost = action.payload;
    //   state.prevPostId = prevPost?.postId;
    },
  },
});

export const { selectPost } = postSlice.actions;

export const selectOpenPost = (state) => state.post.selectedPost;

// export const selectPrevPostId = (state) => state.post.prevPostId;
export const selectPrevPost = (state) => state.post.prevPost;

export default postSlice.reducer;
