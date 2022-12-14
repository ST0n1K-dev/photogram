import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as ROUTES from 'Type/routes';
import ProtectedRoute from '../../hoc/ProtectedRoute';
import AuthorizedRoute from '../../hoc/AuthorizedRoute';

import { NavigationProps } from './Navigation.config';

const HomeScreen = lazy(() => import('../Home'));
const SearchScreen = lazy(() => import('../Search'));
const SignInScreen = lazy(() => import('../SignIn'));
const SignUpScreen = lazy(() => import('../SignUp'));
const NotFoundScreen = lazy(() => import('../NotFound'));
const ProfileScreen = lazy(() => import('../Profile'));
const CreatePost = lazy(() => import('../CreatePost'));

const Navigation = ({ children, user }: NavigationProps) => (
	<>
		<Suspense fallback={<p>Loading ...</p>}>
			<Routes>
				<Route path={ROUTES.NOTFOUND} element={<NotFoundScreen />} />
				<Route element={<ProtectedRoute user={user} />}>
					<Route path={ROUTES.HOME} element={<HomeScreen />} />
					<Route path={ROUTES.SEARCH} element={<SearchScreen />} />
					<Route path={ROUTES.PROFILE} element={<ProfileScreen />} />
					<Route path={ROUTES.CREATE_POST} element={<CreatePost />} />
				</Route>
				<Route
					path={ROUTES.SIGNIN}
					element={(
						<AuthorizedRoute user={user} redirectURL={ROUTES.HOME}>
							<SignInScreen />
						</AuthorizedRoute>
          )}
				/>
				<Route
					path={ROUTES.SIGNUP}
					element={(
						<AuthorizedRoute user={user} redirectURL={ROUTES.HOME}>
							<SignUpScreen />
						</AuthorizedRoute>
          )}
				/>
			</Routes>
		</Suspense>
		{children}
	</>
);

export default Navigation;
