import React from 'react';
import UserStripComponent from './UserStrip.component';

const UserStripContainer = () => {
  const containerProps = () => ({});

  const containerFunctions = {};

  return (
    <UserStripComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default UserStripContainer;
