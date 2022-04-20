import React from 'react';
import { SnackbarProvider } from 'notistack';

import './App.scss';
import Navigation from './screens/Navigation';
import Header from './components/Header';

function App() {
	return (
		<SnackbarProvider
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			maxSnack={3}
		>
			<div className="AppWrapper">
				<div className="App">
					<Header />
					<Navigation />
				</div>
			</div>
		</SnackbarProvider>
	);
}

export default App;
