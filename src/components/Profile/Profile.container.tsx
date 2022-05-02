import useUser from 'Hook/useUser';
import React, { useEffect, useReducer } from 'react';
import { getUserPosts, getUserAvatar } from 'Util/firebase';
import { User } from 'Type/User';
import ProfileComponent from './Profile.component';
import { ProfileContainerInterface, ReducerStateInterface } from './Profile.config';

const ProfileContainer = (props: ProfileContainerInterface) => {
  const { user } = props;
  const { user: currentUser } = useUser();
  const { username: currentUsername = '' } = currentUser as User || {};
  const reducer = (state: ReducerStateInterface, newState: ReducerStateInterface) => ({
    ...state, ...newState
  });

  const initialState = {
    profile: null,
    posts: [],
    totalFollowers: 0,
    followersPopupOpen: false,
    followingPopupOpen: false,
    followers: [],
    following: [],
    isFollowing: false,
    fullName: '',
    description: '',
    avatar: {}
  };

  const [{
    profile,
    posts,
    totalFollowers,
    followersPopupOpen,
    followingPopupOpen,
    followers,
    following,
    fullName,
    description,
    avatar
  }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getProfileInfo() {
      const receivedPosts = await getUserPosts(user!);
      const receivedAvatar = await getUserAvatar(user!.userId);

      dispatch({
        profile: user,
        posts: receivedPosts,
        totalFollowers: user?.followers.length || 0,
        followersPopupOpen: false,
        followingPopupOpen: false,
        followers: user?.followers,
        following: user?.following,
        fullName: user?.fullName,
        description: user?.description || '',
        avatar: receivedAvatar
      });
    }

    if (user) {
      getProfileInfo();
    }
  }, [user, currentUsername]);

  const containerProps = () => ({
    profile,
    posts,
    totalFollowers,
    followersPopupOpen,
    followingPopupOpen,
    followers,
    following,
    fullName,
    description,
    avatar
  });

  const containerFunctions = {
    dispatch
  };

  return (
    <ProfileComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default ProfileContainer;
