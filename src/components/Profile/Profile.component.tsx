import React from 'react';
import { Divider } from '@mui/material';
import UserHero from './UserHero';
import UserPosts from './UserPosts';

import { ProfileComponentInterface } from './Profile.config';
import './Profile.style.scss';

const ProfileComponent: React.FC<ProfileComponentInterface> = (props) => {
  const {
    profile, posts, totalFollowers, followersPopupOpen, dispatch
  } = props;

  return (
    <div className="Profile">
      <UserHero
        profile={profile}
        postsTotal={posts?.length}
        totalFollowers={totalFollowers}
        followersPopupOpen={followersPopupOpen}
        dispath={dispatch}
      />
      <Divider />
      <UserPosts posts={posts} />
    </div>
  );
};

export default ProfileComponent;
