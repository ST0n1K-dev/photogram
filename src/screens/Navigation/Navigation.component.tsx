import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as ROUTES from 'Type/routes';
import { NavigationProps } from './Navigation.config';

const HomeScreen = lazy(() => import('../Home'));
const SignInScreen = lazy(() => import('../SignIn'));
const SignUpScreen = lazy(() => import('../SignUp'));
const NotFoundScreen = lazy(() => import('../NotFound'));

const Navigation: React.FC<NavigationProps> = ({ children }) => (
  <>
    <Suspense fallback={<p>Loading ...</p>}>
      <Routes>
        <Route path={ROUTES.NOTFOUND} element={<NotFoundScreen />} />
        <Route path={ROUTES.HOME} element={<HomeScreen />} />
        <Route path={ROUTES.SIGNIN} element={<SignInScreen />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpScreen />} />
        <Route path={ROUTES.PROFILE} element={<div>Profile</div>} />
        <Route path={ROUTES.DIRECT} element={<div>Messages</div>} />
      </Routes>
    </Suspense>
    { children }
  </>
);

export default Navigation;
