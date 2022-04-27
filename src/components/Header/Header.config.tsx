import React from 'react';

export interface HeaderProps {
	handleDrawerToggle: () => void;
	mobileOpen: boolean;
	drawerWidth: number;
	container: (() => HTMLElement) | undefined;
	anchorEl: null | HTMLElement,
	handleClick: (event: React.MouseEvent<HTMLElement>) => void;
	handleClose: () => void;
	onLogout: () => void;
	open: boolean;
}
