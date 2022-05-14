import React, { useEffect, useState } from 'react';

import {
	Person as PersonIcon,
	Add as AddIcon,
	Home as HomeIcon
} from '@mui/icons-material';
import * as ROUTES from 'Type/routes';
import { User } from 'Type/User';
import { useAuth } from 'Hook/useAuth';

import { SpeedDialActions } from './SpeedDial.config';

import SpeedDialComponent from './SpeedDial.component';

const SpeedDialContainer = () => {
	const [activeUser, setActiveUser] = useState<User | null>(null);
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				setActiveUser(user);
			}, 1500);
		} else {
			setActiveUser(null);
		}
	}, [user]);

	const speedDialActions: SpeedDialActions[] = [
		{ icon: <PersonIcon />, name: 'Profile', url: activeUser && activeUser.displayName ? `/profile/${activeUser?.displayName}` : ROUTES.SIGNIN }
	];

	if (activeUser && Object.keys(activeUser).length > 0) {
		speedDialActions.splice(0, 0, { icon: <HomeIcon />, name: 'Home', url: ROUTES.HOME });
		speedDialActions.splice(2, 0, { icon: <AddIcon />, name: 'New post', url: ROUTES.CREATE_POST });
	}

	const containerProps = () => ({
		speedDialActions,
		user: activeUser || {}
	});

	const containerFunctions = {};

	return (
		<SpeedDialComponent
			{...containerProps()}
			{...containerFunctions}
		/>
	);
};

export default SpeedDialContainer;
