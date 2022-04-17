import React from 'react';

import {
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon
} from '@mui/material';

import { SpeedDialProps } from './SpeedDial.config';

const SpeedDialComponent: React.FC<SpeedDialProps> = (props) => {
	const {
	 open, handleOpen, handleClose, speedDialActions
	} = props;

	return (
		<SpeedDial
			ariaLabel="SPeed dial menu"
			sx={{
				position: 'absolute',
				bottom: 16,
				right: 16,
				display: { xs: 'none', md: 'flex' }
			}}
			icon={<SpeedDialIcon />}
			onClose={handleClose}
			onOpen={handleOpen}
			open={open}
		>
			{speedDialActions.map((action) => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
					onClick={handleClose}
				/>
			))}
		</SpeedDial>
	);
};

export default SpeedDialComponent;
