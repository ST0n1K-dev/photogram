import React from 'react';
import { Divider } from '@mui/material';
import UserHero from './UserHero';
import UserPosts from './UserPosts';
import PostsCategories from './PostsCategories';

import { ProfileComponentInterface } from './Profile.config';
import './Profile.style.scss';

const ProfileComponent: React.FC<ProfileComponentInterface> = (props) => {
  const {
    profile,
    posts,
    displayingPosts,
    totalFollowers,
    followersPopupOpen,
    followingPopupOpen,
    followers,
    following,
    fullName,
    description,
    avatar,
    activeCategory,
    handleCategorySelect,
    dispatch
  } = props;

  return (
    <div className="Profile">
      <UserHero
        profile={profile}
        avatar={avatar}
        postsTotal={posts?.length}
        totalFollowers={totalFollowers}
        followersPopupOpen={followersPopupOpen}
        followingPopupOpen={followingPopupOpen}
        followers={followers}
        following={following}
        fullName={fullName}
        description={description}
        dispatch={dispatch}
      />
      <Divider />
      <PostsCategories
        posts={posts}
        activeCategory={activeCategory!}
        handleCategorySelect={handleCategorySelect}
      />
      <UserPosts posts={displayingPosts} profile={profile} />
    </div>
  );
};

export default ProfileComponent;
