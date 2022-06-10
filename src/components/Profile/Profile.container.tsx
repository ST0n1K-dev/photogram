import useUser from 'Hook/useUser';
import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { User } from 'Type/User';
import { RootState } from '../../redux/store';
import ProfileComponent from './Profile.component';
import { ReducerStateInterface } from './Profile.config';

const ProfileContainer = () => {
  // const { user } = props;
  const { user: currentUser } = useUser();
  const selectedUserPosts = useSelector((state: RootState) => state.SelectedProfile.posts);
  const user = useSelector((state: RootState) => state.SelectedProfile.user) as User;
  const { username: currentUsername = '' } = currentUser as User || {};
  const reducer = (state: ReducerStateInterface, newState: ReducerStateInterface) => ({
    ...state, ...newState
  });

  const initialState = {
    followersPopupOpen: false,
    followingPopupOpen: false,
    activeCategory: ''
  };

  const [{
    followersPopupOpen,
    followingPopupOpen,
    activeCategory
  }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getProfileInfo() {
      dispatch({
        followersPopupOpen: false,
        followingPopupOpen: false
      });
    }

    if (user) {
      getProfileInfo();
    }
  }, [user, currentUsername]);

  const handleCategorySelect = (category: string) => {
    dispatch({ activeCategory: category });
  };

  const getUserPosts = () => (activeCategory
      ? selectedUserPosts.filter((post) => post.category === activeCategory)
      : selectedUserPosts);

  const containerProps = () => ({
    profile: user,
    posts: selectedUserPosts,
    displayingPosts: getUserPosts(),
    totalFollowers: user?.followers.length,
    followersPopupOpen,
    followingPopupOpen,
    followers: user?.followers,
    following: user?.following,
    fullName: user?.fullName,
    description: user?.description,
    avatar: user?.avatar,
    activeCategory
  });

  const containerFunctions = {
    dispatch,
    handleCategorySelect
  };

  return (
    <ProfileComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default ProfileContainer;
