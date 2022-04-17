import React from 'react';

import Home from './Home.component';

const HomeContainer: React.FC = () => {
  const containerProps = () => ({
    test: 'asd',
  });

  const containerFunctions = {};

  return (
    <Home
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default HomeContainer;
