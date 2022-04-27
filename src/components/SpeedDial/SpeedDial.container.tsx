import React, { useContext } from 'react';

import {
	Person as PersonIcon,
	Send as SendIcon,
	Home as HomeIcon
} from '@mui/icons-material';
import * as ROUTES from 'Type/routes';
import UserContext from 'Context/user';

import { SpeedDialActions } from './SpeedDial.config';

import SpeedDialComponent from './SpeedDial.component';

const SpeedDialContainer = () => {
	const { user } = useContext(UserContext);

	const speedDialActions: SpeedDialActions[] = [
		{ icon: <PersonIcon />, name: 'Profile', url: Object.keys(user).length > 0 ? `/profile/${user.displayName}` : ROUTES.SIGNIN }
	];

	if (Object.keys(user).length > 0) {
		speedDialActions.splice(0, 0, { icon: <HomeIcon />, name: 'Home', url: ROUTES.HOME });
		speedDialActions.splice(2, 0, { icon: <SendIcon />, name: 'Messages', url: ROUTES.DIRECT });
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
