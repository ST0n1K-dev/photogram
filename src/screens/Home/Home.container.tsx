import React from 'react';
import { User } from 'Type/User';
import { useUser } from 'Hook/useUser';

import HomeComponent from './Home.component';

export const HomeContainer = () => {
    const { user } = useUser();

	const getAccountActivityInfo = () => {
		const { followers = [], following = [] } = user as User;

		return {
			followers: followers.length,
			following: following.length
		};
	};

    const containerProps = () => ({
		user: user as User,
		accountActivityInfo: getAccountActivityInfo()
	});

	const containerFunctions = {};

	return <HomeComponent {...containerProps()} {...containerFunctions} />;
};

export default HomeContainer;
