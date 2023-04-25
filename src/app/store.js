import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import postReducer from '../features/postSlice';

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['your/action/type'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['payload.timestamp', 'post.selectedPost.timestamp', 'post.prevPost.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['items.dates'],
    },
  });

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  middleware,
});
