import React from 'react';
import './App.scss';
import Navigation from './screens/Navigation';
import Header from './components/Header';
import SpeedDial from './components/SpeedDial';

function App() {
	return (
		<div className="AppWrapper">
			<div className="App">
				<Header />
				<Navigation />
				<footer>Im a footer</footer>
				<SpeedDial />
			</div>
		</div>
	);
}

export default App;
