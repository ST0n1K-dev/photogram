import React from 'react';

import HomeComponent from './Home.component';

export const HomeContainer = () => {
    const containerProps = () => ({});

	const containerFunctions = {};

	return <HomeComponent {...containerProps()} {...containerFunctions} />;
};

export default HomeContainer;
