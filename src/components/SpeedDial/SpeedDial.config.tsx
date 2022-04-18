import React from 'react';

export type SpeedDialActions = {
	icon: React.ReactNode,
	name: string,
	action?: () => void
}

export interface SpeedDialProps {
	handleOpen: () => void;
	handleClose: () => void;
	open: boolean;
	speedDialActions: SpeedDialActions[]
}
