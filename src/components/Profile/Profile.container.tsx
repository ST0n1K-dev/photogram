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
    totalFollowers: 0
  };

  const [{ profile, posts, totalFollowers }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getProfileInfo() {
      const receivedPosts = await getUserPosts(user!);

      dispatch({
        profile: user,
        posts: receivedPosts,
        totalFollowers: user?.followers.length || 0,
      });
    }

    if (user) {
      getProfileInfo();
    }
  }, [user]);

  const containerProps = () => ({
    profile,
    posts,
    totalFollowers
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
