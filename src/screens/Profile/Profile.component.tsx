import React from 'react';
import { CircularProgress } from '@mui/material';
import UserProfile from 'Component/Profile';
import { User } from 'Type/User';

import { ProfileComponentInterface } from './Profile.config';
import './Profile.style.scss';

const ProfileComponent: React.FC<ProfileComponentInterface> = (props) => {
  const { user, isLoading } = props;

  if (!(user as User)?.username || isLoading) {
    return (
      <div className="ProfilePage__Loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="ProfilePage">
      <UserProfile />
    </div>
  );
};

export default ProfileComponent;
