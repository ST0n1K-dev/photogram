/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';

import './Header.style.scss';
import {
    Box, Drawer, Toolbar, Divider, List, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import UserContext from 'Context/user';
// import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';
import IconButton from '@mui/material/IconButton';
import {
	Person as PersonIcon,
	Send as SendIcon,
	Menu as MenuIcon,
	Add as AddIcon,
	Home as HomeIcon
} from '@mui/icons-material';
import * as ROUTES from 'Type/routes';
import SpeedDial from 'Component/SpeedDial';
import { Link } from 'react-router-dom';
import { HeaderProps } from './Header.config';

const renderDrawerListItem = (
	text: string,
	icon: React.ReactNode,
	url: string
) => (
	<Link to={url}>
		<ListItemButton key={text}>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={text} />
		</ListItemButton>
	</Link>
);

const renderDrawerContent = (user: any) => (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{user && renderDrawerListItem('Home', <HomeIcon />, ROUTES.HOME)}
				{renderDrawerListItem('Profile', <PersonIcon />, user ? ROUTES.PROFILE : ROUTES.SIGNIN)}
				{user && renderDrawerListItem('Messages', <SendIcon />, ROUTES.DIRECT)}
				{user && renderDrawerListItem('Create post', <AddIcon />, ROUTES.PROFILE)}
			</List>
		</div>
	);

const DrawerNavigation: React.FC<HeaderProps> = (props) => {
    const {
        drawerWidth, mobileOpen, container, handleDrawerToggle
    } = props;
    const { user } = useContext(UserContext);

    return (
      <Box sx={{ display: 'flex' }}>
          <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
          >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                  container={container}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{ keepMounted: true }}
                  sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
              >
                  {renderDrawerContent(user)}
              </Drawer>
          </Box>
      </Box>
    );
};

const Header: React.FC<HeaderProps> = (props) => {
    const { handleDrawerToggle } = props;
    // const { firebase } = useContext(FirebaseContext) as FirebaseContextInterface;

    return (
      <header className="Header">
          <div className="Header__logo">
              Photogram
	          <DrawerNavigation {...props} />
          </div>
          <div className="Header__actions">
              <IconButton
	              color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
	              sx={{
		              display: { xs: 'block', md: 'none' }
	              }}
              >
                  <MenuIcon />
              </IconButton>
              <SpeedDial />
              {/* <button type="button" onClick={() => firebase.auth().signOut()}>
                  Sign Out
              </button> */}
          </div>
      </header>
    );
};

export default Header;
