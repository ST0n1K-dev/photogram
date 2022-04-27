/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import './Header.style.scss';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from '@mui/icons-material';
import SpeedDial from 'Component/SpeedDial';
import AccountMenu from 'Component/AccountMenu';
import { HeaderProps } from './Header.config';

const Header: React.FC<HeaderProps> = (props) => {
    const { handleClick } = props;

    return (
		<div className="HeaderWrapper">
			<header className="Header">
				<div className="Header__logo">
					Photogram
				</div>
				<div className="Header__actions">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleClick}
						sx={{
							display: { xs: 'block', md: 'none' },
						}}
					>
						<MenuIcon />
					</IconButton>
					<AccountMenu {...props} />
					<SpeedDial />
				</div>
			</header>
		</div>
	);
};

export default Header;
