import React from 'react';
import { User } from 'Type/User';
import { useUser } from 'Hook/useUser';

import HomeComponent from './Home.component';

export const HomeContainer = () => {
    const { user } = useUser();

    const containerProps = () => ({
		user: user as User
	});

	const containerFunctions = {};

	return <HomeComponent {...containerProps()} {...containerFunctions} />;
};

export default HomeContainer;
