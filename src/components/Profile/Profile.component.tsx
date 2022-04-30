import React from 'react';
import UserHero from './UserHero';
import UserPosts from './UserPosts';

import { ProfileComponentInterface } from './Profile.config';
import './Profile.style.scss';

const ProfileComponent: React.FC<ProfileComponentInterface> = (props) => {
  const {
    profile, posts, totalFollowers, dispatch
  } = props;

  return (
    <div className="Profile">
      <UserHero
        profile={profile}
        postsTotal={posts?.length}
        totalFollowers={totalFollowers}
        dispath={dispatch}
      />
      <UserPosts />
    </div>
  );
};

export default ProfileComponent;
