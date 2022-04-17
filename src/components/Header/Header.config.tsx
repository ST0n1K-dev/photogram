export interface HeaderProps {
	handleDrawerToggle: () => void;
	mobileOpen: boolean;
	drawerWidth: number;
	container: (() => HTMLElement) | undefined;
}
