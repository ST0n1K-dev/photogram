/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostInterface } from 'Type/Post';
import { User } from 'Type/User';

interface MyAccountSliceInterface {
    user: User | object
    posts: Array<PostInterface>
}

interface HandleFollowInterface {
    isFollowing: boolean
    currentUserId: string
}

const initialState: MyAccountSliceInterface = {
    user: {},
    posts: []
};

export const selectedUserSlice = createSlice({
  name: 'SelectedUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | object>) => {
      state.user = action.payload;
    },
    setUserPosts: (state, action: PayloadAction<Array<PostInterface>>) => {
      state.posts = action.payload;
    },
    handleSelectedAccountFollow: (state, action: PayloadAction<HandleFollowInterface>) => {
        const { isFollowing, currentUserId } = action.payload;
        state.user = {
            ...state.user,
            followers: isFollowing ? (state.user as User).followers
                .filter((followersId) => followersId !== currentUserId)
            : [...(state.user as User).followers, currentUserId]
        };
    },
    updateUser: (state, action: PayloadAction<{ [x: string]: string }>) => {
        state.user = {
            ...state.user,
            ...action.payload
        };
    },
  },
});

export const {
    setUser, setUserPosts, handleSelectedAccountFollow, updateUser
} = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
