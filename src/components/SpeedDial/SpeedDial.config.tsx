import React from 'react';
import { User } from 'Type/User';

export type SpeedDialActions = {
	icon: React.ReactNode,
	name: string,
	action?: () => void,
	url: string
}

export interface SpeedDialProps {
	speedDialActions: SpeedDialActions[],
	user: User | object
}
