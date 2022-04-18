import React from 'react';
import './App.scss';
import Navigation from './screens/Navigation';
import Header from './components/Header';

function App() {
	return (
		<div className="AppWrapper">
			<div className="App">
				<Header />
				<Navigation />
				<footer>Im a footer</footer>
			</div>
		</div>
	);
}

export default App;
