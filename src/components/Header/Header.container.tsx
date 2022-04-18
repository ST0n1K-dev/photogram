import React from 'react';
import HeaderComponent from './Header.component';

const HeaderContainer = () => {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container = window !== undefined ? () => window.document.body : undefined;

  const containerProps = () => ({
    drawerWidth, container, mobileOpen
  });

  const containerFunctions = {
    handleDrawerToggle
  };

  return (
    <HeaderComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default HeaderContainer;
