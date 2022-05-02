import React, { useState, useEffect } from 'react';
import { User } from 'Type/User';
import { useUser } from 'Hook/useUser';

import HomeComponent from './Home.component';

export const HomeContainer = () => {
    const { user } = useUser();
	const [following, setFollowing] = useState<Array<string>>([]);

	useEffect(() => {
		if (user) {
			setFollowing((user as User).following);
		}
	}, [user]);

    const containerProps = () => ({
		user: user as User,
		following
	});

	const containerFunctions = {
		setFollowing
	};

	return <HomeComponent {...containerProps()} {...containerFunctions} />;
};

export default HomeContainer;
