import * as React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { HeaderProps } from 'Component/Header/Header.config';
import { useUser } from 'Hook/useUser';
import { User } from 'Type/User';

import {
	Person as PersonIcon,
	Add as AddIcon,
	Home as HomeIcon,
	Search as SearchIcon
} from '@mui/icons-material';
import * as ROUTES from 'Type/routes';

const renderDrawerListItem = (
	text: string,
	icon: React.ReactNode,
	url: string
) => (
	<Link to={url}>
		<MenuItem>
			{icon} {text}
		</MenuItem>
	</Link>
);

const MenuItems = () => {
	const { user } = useUser();

	return (
		<>
			{user && renderDrawerListItem('Стрічка', <HomeIcon />, ROUTES.HOME)}
			{user && renderDrawerListItem('Пошук', <SearchIcon />, ROUTES.SEARCH)}
			{renderDrawerListItem('Профіль', <PersonIcon />, user ? `/profile/${(user as User).username}` : ROUTES.SIGNIN)}
			{user && renderDrawerListItem('Нова публікація', <AddIcon />, ROUTES.CREATE_POST)}
		</>
	);
};

const AccountMenu: React.FC<HeaderProps> = (props) => {
	const {
		anchorEl,
		open,
		handleClose,
		onLogout
	} = props;

	return (
		<Menu
			anchorEl={anchorEl}
			id="account-menu"
			open={open}
			onClose={handleClose}
			onClick={handleClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,
					},
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>
			<MenuItems />
			<Divider />
			<MenuItem onClick={onLogout}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Вийти
			</MenuItem>
		</Menu>
	);
};

export default AccountMenu;
