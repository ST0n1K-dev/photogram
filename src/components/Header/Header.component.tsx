import React from 'react';

import './Header.style.scss';
import {
    Box, Drawer, Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
	Person as PersonIcon,
	Send as SendIcon,
	Menu as MenuIcon,
	Add as AddIcon,
	Home as HomeIcon
} from '@mui/icons-material';
import SpeedDial from '../SpeedDial';
import { HeaderProps } from './Header.config';

const renderDrawerListItem = (text: string, icon: React.ReactNode) => (
		<ListItem button key={text}>
			<ListItemIcon>
				{ icon }
			</ListItemIcon>
			<ListItemText primary={text} />
		</ListItem>
	);

const renderDrawerContent = () => (
  <div>
      <Toolbar />
      <Divider />
      <List>
	      { renderDrawerListItem('Home', <HomeIcon />) }
	      { renderDrawerListItem('Profile', <PersonIcon />) }
	      { renderDrawerListItem('Messages', <SendIcon />) }
	      { renderDrawerListItem('Create post', <AddIcon />) }
      </List>
  </div>
);

const DrawerNavigation: React.FC<HeaderProps> = (props) => {
    const {
        drawerWidth, mobileOpen, container, handleDrawerToggle
    } = props;
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
                  {renderDrawerContent()}
              </Drawer>
          </Box>
      </Box>
    );
};

const Header: React.FC<HeaderProps> = (props) => {
    const { handleDrawerToggle } = props;
    return (
      <div className="Header">
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
          </div>
      </div>
    );
};

export default Header;
