import React, { useContext } from 'react';

import {
	Person as PersonIcon,
	Add as AddIcon,
	Home as HomeIcon
} from '@mui/icons-material';
import * as ROUTES from 'Type/routes';
import UserContext from 'Context/user';

import { SpeedDialActions } from './SpeedDial.config';

import SpeedDialComponent from './SpeedDial.component';

const SpeedDialContainer = () => {
	const { user } = useContext(UserContext);

	const speedDialActions: SpeedDialActions[] = [
		{ icon: <PersonIcon />, name: 'Profile', url: user && Object.keys(user).length > 0 ? `/profile/${user.displayName}` : ROUTES.SIGNIN }
	];

	if (user && Object.keys(user).length > 0) {
		speedDialActions.splice(0, 0, { icon: <HomeIcon />, name: 'Home', url: ROUTES.HOME });
		speedDialActions.splice(2, 0, { icon: <AddIcon />, name: 'New post', url: ROUTES.CREATE_POST });
	}

	const containerProps = () => ({
		speedDialActions
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
