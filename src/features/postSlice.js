import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    selectedPost: null,
    prevPost: null,
    commentCount: 0,
    likeCount: 0,
  },
  reducers: {
    selectPost: (state, action) => {
      state.prevPost = state.selectedPost;
      state.selectedPost = action.payload;
      state.commentCount = action.payload?.comments?.length || 0;
      state.likeCount = action.payload?.likes?.length || 0;
    },
    addComment: (state, action) => {
      if (state.selectedPost && state.selectedPost.postId === action.payload.postId) {
        state.selectedPost.comments.push(action.payload.comment);
        state.commentCount++;
      }
    },
    addLike: (state, action) => {
        if (state.selectedPost && state.selectedPost.postId === action.payload.postId) {
          if (!state.selectedPost.likes) {
            state.selectedPost.likes = []; // initialize likes array if it doesn't exist
          }
          state.selectedPost.likes.push(action.payload.like);
          state.likeCount += 1;
        }
      },
      updatePost: (state, action) => {
        if (state.selectedPost && state.selectedPost.postId === action.payload.postId) {
          state.selectedPost = action.payload;
          state.likeCount = action.payload?.likes?.length || 0;
          state.commentCount = action.payload?.comments?.length || 0;
        }
      },
      
  },
});

export const { selectPost, addComment, addLike, updatePost } = postSlice.actions;

export const selectOpenPost = (state) => state.post.selectedPost;
export const selectPrevPost = (state) => state.post.prevPost;
export const selectCommentCount = (state) => state.post.commentCount;
export const selectLikeCount = (state) => state.post.likeCount;

export default postSlice.reducer;
