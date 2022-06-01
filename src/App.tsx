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
						vertical: 'bottom',
						horizontal: 'left',
					}}
					maxSnack={3}
				>
					<Header />
					<div className="AppWrapper">
						<div className="App">
							<Navigation user={user} />
						</div>
					</div>
				</SnackbarProvider>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
