import React from 'react';
import UserProfile from 'Component/Profile';

import { ProfileComponentInterface } from './Profile.config';
import './Profile.style.scss';

const ProfileComponent: React.FC<ProfileComponentInterface> = (props) => {
  const { user } = props;

  if (!user?.username) {
    return null;
  }

  return (
    <div className="ProfilePage">
      <UserProfile user={user} />
    </div>
  );
};

export default ProfileComponent;
