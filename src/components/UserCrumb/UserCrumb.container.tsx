import React from 'react';
import UserCrumbComponent from './UserCrumb.component';
import { UserCrumbContainerInterface } from './UserCrumb.config';

const HeaderContainer: React.FC<UserCrumbContainerInterface> = (props) => {
  const { username, fullName, accountActivityInfo } = props;

  const containerProps = () => ({
    username,
    fullName,
    accountActivityInfo
  });

  const containerFunctions = {};

  return (
    <UserCrumbComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default HeaderContainer;
