import React from 'react';

import Navigation from './Navigation.component';
import { NavigationProps } from './Navigation.config';

const NavigationContainer: React.FC<NavigationProps> = (props) => {
  const { children, user } = props;
  const containerProps = () => ({
    children,
    user
  });

  const containerFunctions = {};

  return (
    <Navigation
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default NavigationContainer;
