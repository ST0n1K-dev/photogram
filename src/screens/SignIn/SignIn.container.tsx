import React from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import * as ROUTES from 'Type/routes';
import { useSnackbar } from 'notistack';

import SignInComponent from './SignIn.component';
import { SignInValues } from './SignIn.config';

const NavigationContainer: React.FC = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

	const handleLogin = async (credentials: SignInValues) => {
        const { email, password } = credentials;

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            enqueueSnackbar('You are successfully logged in', { variant: 'success' });
            navigate(ROUTES.HOME);
        } catch (error: unknown) {
            enqueueSnackbar((error as Error).message, { variant: 'error' });
        }
    };

	const containerProps = () => ({});

	const containerFunctions = {
        handleLogin
    };

	return <SignInComponent {...containerProps()} {...containerFunctions} />;
};

export default NavigationContainer;
