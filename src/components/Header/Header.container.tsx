import { useFirebase } from 'Hook/useFirebase';
import React from 'react';

import { FirebaseContextInterface } from 'Context/firebase';
import HeaderComponent from './Header.component';

const HeaderContainer = () => {
	const { firebase } = useFirebase() as FirebaseContextInterface;
	const drawerWidth = 240;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const onLogout = () => {
		firebase!.auth().signOut();
	};

	const container = window !== undefined ? () => window.document.body : undefined;

	const containerProps = () => ({
		drawerWidth,
		container,
		mobileOpen,
		open,
		anchorEl,
	});

	const containerFunctions = {
		handleDrawerToggle,
		handleClose,
		handleClick,
		onLogout
	};

	return <HeaderComponent {...containerProps()} {...containerFunctions} />;
};

export default HeaderContainer;
