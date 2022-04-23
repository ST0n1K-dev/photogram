import React from 'react';
import ChangeComponent from './Change.component';

const HeaderContainer = () => {
  const containerProps = () => ({});

  const containerFunctions = {};

  return (
    <ChangeComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default HeaderContainer;
