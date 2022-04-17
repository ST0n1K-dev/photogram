import React from 'react';

import Navigation from './Navigation.component';
import { NavigationProps } from './Navigation.config';

const NavigationContainer: React.FC<NavigationProps> = (props) => {
  const { children } = props;
  const containerProps = () => ({
    children,
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
