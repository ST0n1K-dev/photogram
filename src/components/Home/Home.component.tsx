import React from 'react';
import { HomeTypes } from 'Type/ComponentProps.types';

export const HomeComponent: React.FC<HomeTypes> = ({ test }) => (
  <div>
    Home { test }
  </div>
);

export default HomeComponent;
