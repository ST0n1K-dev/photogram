/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useAuth } from 'Hook/useAuth';
import { UserContext } from 'Context/user';
import './App.scss';
import Navigation from './screens/Navigation';
import Header from './components/Header';

function App() {
	const { user } = useAuth();
	return (
		<UserContext.Provider value={{ user }}>
			<BrowserRouter>
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
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
