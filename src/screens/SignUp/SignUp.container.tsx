import React from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import * as ROUTES from 'Type/routes';
import { isUserExists, isEmailExists } from 'Util/firebase';
import { useSnackbar } from 'notistack';

import SignUpComponent from './SignUp.component';
import { SignUpValues } from './SignUp.config';

const NavigationContainer: React.FC = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

	const handleSignUp = async (credentials: SignUpValues) => {
        const {
            email, password, username, fullName
        } = credentials;

        const usernameExists = await isUserExists(username);
        const emailExists = await isEmailExists(email);

        if (!usernameExists && !emailExists) {
            try {
                // create user
                const createdUser = await firebase.auth()
                    .createUserWithEmailAndPassword(email, password);

                // assign user a name
                await createdUser.user?.updateProfile({
                    displayName: username
                });

                // create user in collection
                await firebase.firestore().collection('users').add({
                    userId: createdUser.user?.uid,
                    username,
                    fullName,
                    emailAddress: email.toLowerCase(),
                    followers: [],
                    following: [],
                    dateCreated: Date.now()
                });

                enqueueSnackbar('Your account has been created', { variant: 'success' });
                navigate(ROUTES.HOME);
            } catch (error: unknown) {
                enqueueSnackbar((error as Error).message, { variant: 'error' });
            }
        } else if (emailExists) {
                enqueueSnackbar('User with this email already exists', { variant: 'error' });
            } else {
                enqueueSnackbar('User with this username already exists', { variant: 'error' });
            }
    };

	const containerProps = () => ({});

	const containerFunctions = {
        handleSignUp
    };

	return <SignUpComponent {...containerProps()} {...containerFunctions} />;
};

export default NavigationContainer;
