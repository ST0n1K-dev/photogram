/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostInterface } from 'Type/Post';
import { User } from 'Type/User';

interface MyAccountSliceInterface {
    user: User | object
    posts: Array<PostInterface>
    followingPosts: Array<PostInterface>
}

interface HandleFollowInterface {
    isFollowing: boolean
    profileUserId: string
}

const initialState: MyAccountSliceInterface = {
    user: {},
    posts: [],
    followingPosts: []
};

export const myAccountSlice = createSlice({
  name: 'MyAccount',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | object>) => {
      state.user = action.payload;
    },
    setUserPosts: (state, action: PayloadAction<Array<PostInterface>>) => {
      state.posts = action.payload;
    },
    handleFollow: (state, action: PayloadAction<HandleFollowInterface>) => {
        const { isFollowing, profileUserId } = action.payload;
        state.user = {
            ...state.user,
            following: isFollowing ? (state.user as User).following
                .filter((followingId) => followingId !== profileUserId)
            : [...(state.user as User).following, profileUserId]
        };
    },
    updateUser: (state, action: PayloadAction<{ [x: string]: string }>) => {
        state.user = {
            ...state.user,
            ...action.payload
        };
    },
    setFollowingPosts: (state, action: PayloadAction<Array<PostInterface>>) => {
        state.followingPosts = action.payload;
    }
  },
});

export const {
    setUser, setUserPosts, handleFollow, updateUser,
    setFollowingPosts
} = myAccountSlice.actions;

export default myAccountSlice.reducer;
