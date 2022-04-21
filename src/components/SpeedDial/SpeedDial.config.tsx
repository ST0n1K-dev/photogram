import React from 'react';

export type SpeedDialActions = {
	icon: React.ReactNode,
	name: string,
	action?: () => void,
	url: string
}

export interface SpeedDialProps {
	handleOpen: () => void;
	handleClose: () => void;
	onNavigate: (url: string) => void;
	open: boolean;
	speedDialActions: SpeedDialActions[]
}
