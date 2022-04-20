import React from 'react';

import {
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon
} from '@mui/material';

import { SpeedDialProps } from './SpeedDial.config';
import './SpeedDial.style.scss';

const SpeedDialComponent: React.FC<SpeedDialProps> = (props) => {
	const {
	 open, handleOpen, handleClose, speedDialActions
	} = props;

	return (
		<div className="SpeedDial">
			<SpeedDial
				ariaLabel="Speed dial menu"
				sx={{
					display: { xs: 'none', md: 'flex' }
				}}
				direction="left"
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
		</div>
	);
};

export default SpeedDialComponent;
