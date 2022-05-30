import { configureStore } from '@reduxjs/toolkit';
import myAccountReducer from './slices/MyAccount';
import selectedProfileReducer from './slices/SelectedProfile';
import postActionsReducer from './slices/PostActions';

export const store = configureStore({
  reducer: {
    MyAccount: myAccountReducer,
    SelectedProfile: selectedProfileReducer,
    PostActions: postActionsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
