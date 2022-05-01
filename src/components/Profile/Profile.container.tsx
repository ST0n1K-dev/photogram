import React, { useEffect, useReducer } from 'react';
import { getUserPosts } from 'Util/firebase';
import ProfileComponent from './Profile.component';
import { ProfileContainerInterface, ReducerStateInterface } from './Profile.config';

const ProfileContainer = (props: ProfileContainerInterface) => {
  const { user } = props;
  const reducer = (state: ReducerStateInterface, newState: ReducerStateInterface) => ({
    ...state, ...newState
  });

  const initialState = {
    profile: null,
    posts: [],
    totalFollowers: 0,
    followersPopupOpen: false
  };

  const [{
    profile,
    posts,
    totalFollowers,
    followersPopupOpen
  }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getProfileInfo() {
      const receivedPosts = await getUserPosts(user!);

      dispatch({
        profile: user,
        posts: receivedPosts,
        totalFollowers: user?.followers.length || 0,
        followersPopupOpen: false
      });
    }

    if (user) {
      getProfileInfo();
    }
  }, [user]);

  const containerProps = () => ({
    profile,
    posts,
    totalFollowers,
    followersPopupOpen
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
