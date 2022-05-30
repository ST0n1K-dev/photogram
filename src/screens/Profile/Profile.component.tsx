import React from 'react';
import UserProfile from 'Component/Profile';
import { User } from 'Type/User';

import { ProfileComponentInterface } from './Profile.config';
import './Profile.style.scss';

const ProfileComponent: React.FC<ProfileComponentInterface> = (props) => {
  const { user } = props;

  if (!(user as User)?.username) {
    return null;
  }

  return (
    <div className="ProfilePage">
      <UserProfile />
    </div>
  );
};

export default ProfileComponent;
