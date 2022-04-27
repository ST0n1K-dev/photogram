import React from 'react';

export type SpeedDialActions = {
	icon: React.ReactNode,
	name: string,
	action?: () => void,
	url: string
}

export interface SpeedDialProps {
	speedDialActions: SpeedDialActions[]
}
