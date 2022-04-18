import React from 'react';
import {
	Person as PersonIcon,
	Send as SendIcon,
	Add as AddIcon,
	Home as HomeIcon
} from '@mui/icons-material';
import { SpeedDialActions } from './SpeedDial.config';

import SpeedDialComponent from './SpeedDial.component';

const SpeedDialContainer = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const speedDialActions: SpeedDialActions[] = [
		{ icon: <HomeIcon />, name: 'Home' },
		{ icon: <PersonIcon />, name: 'Profile' },
		{ icon: <SendIcon />, name: 'Messages' },
		{ icon: <AddIcon />, name: 'New post' }
	];

	const containerProps = () => ({
		open,
		speedDialActions
	});

	const containerFunctions = {
		handleOpen,
		handleClose
	};

	return (
		<SpeedDialComponent
			{...containerProps()}
			{...containerFunctions}
		/>
	);
};

export default SpeedDialContainer;
