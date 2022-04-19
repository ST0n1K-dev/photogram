import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as ROUTES from 'Type/routes';
import { NavigationProps } from './Navigation.config';

const HomeScreen = lazy(() => import('../Home'));

const Navigation: React.FC<NavigationProps> = ({ children }) => (
  <BrowserRouter>
    <Suspense fallback={<p>Loading ...</p>}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomeScreen />} />
        <Route path={ROUTES.PROFILE} element={<div>Profile</div>} />
        <Route path={ROUTES.DIRECT} element={<div>Messages</div>} />
      </Routes>
    </Suspense>
    { children }
  </BrowserRouter>
);

export default Navigation;
