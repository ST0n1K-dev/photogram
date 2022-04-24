import React from 'react';
import UserCrumbComponent from './UserCrumb.component';
import { UserCrumbContainerInterface } from './UserCrumb.config';

const UserCrumbContainer: React.FC<UserCrumbContainerInterface> = (props) => {
  const {
    username, fullName, following, followers
  } = props;

  const containerProps = () => ({
    username,
    fullName,
    following: following.length,
    followers: followers.length
  });

  const containerFunctions = {};

  return (
    <UserCrumbComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default UserCrumbContainer;
