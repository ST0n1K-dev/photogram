import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useFirebase } from 'Hook/useFirebase';

import { FirebaseContextInterface } from 'Context/firebase';

import { SpeedDialProps } from './SpeedDial.config';
import './SpeedDial.style.scss';

const SpeedDialComponent: React.FC<SpeedDialProps> = (props) => {
	const { speedDialActions, user } = props;
	const { firebase } = useFirebase() as FirebaseContextInterface;

	return (
		<Box
			sx={{
				display: { xs: 'none', md: 'block' }
			}}
			className="SpeedDial"
		>
			{speedDialActions.map((action) => (
				<Link key={action.name} to={action.url}>
					<IconButton
						color="primary"
						aria-label={action.name}
						component="span"
					>
						{action.icon}
					</IconButton>
				</Link>
			))}
			{Object.keys(user).length > 0 && (
				<IconButton color="primary" onClick={() => firebase.auth().signOut()}>
					<LogoutIcon />
				</IconButton>
			)}
		</Box>
	);
};

export default SpeedDialComponent;
