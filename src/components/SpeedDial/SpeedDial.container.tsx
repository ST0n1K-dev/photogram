import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	Person as PersonIcon,
	Send as SendIcon,
	Add as AddIcon,
	Home as HomeIcon
} from '@mui/icons-material';
import * as ROUTES from 'Type/routes';
import UserContext from 'Context/user';

import { SpeedDialActions } from './SpeedDial.config';

import SpeedDialComponent from './SpeedDial.component';

const SpeedDialContainer = () => {
	const [open, setOpen] = React.useState(false);
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const onNavigate = (url: string) => {
		navigate(url);
		handleClose();
	};

	const speedDialActions: SpeedDialActions[] = [
		{ icon: <PersonIcon />, name: 'Profile', url: user ? `/profile/${user.displayName}` : ROUTES.SIGNIN }
	];

	if (user) {
		speedDialActions.splice(0, 0, { icon: <HomeIcon />, name: 'Home', url: ROUTES.HOME });
		speedDialActions.splice(2, 0, { icon: <SendIcon />, name: 'Messages', url: ROUTES.DIRECT });
		speedDialActions.splice(3, 0, { icon: <AddIcon />, name: 'New post', url: ROUTES.PROFILE });
	}

	const containerProps = () => ({
		open,
		speedDialActions
	});

	const containerFunctions = {
		handleOpen,
		handleClose,
		onNavigate
	};

	return (
		<SpeedDialComponent
			{...containerProps()}
			{...containerFunctions}
		/>
	);
};

export default SpeedDialContainer;
