import React from 'react';
import Tesseract from 'tesseract.js';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import * as ROUTES from 'Type/routes';
import { isUserExists, isEmailExists } from 'Util/firebase';
import { useSnackbar } from 'notistack';

import SignUpComponent from './SignUp.component';
import { SignUpValues } from './SignUp.config';

const NavigationContainer: React.FC = () => {
    const [dob, setDob] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const getAge = (dateString: string) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            // eslint-disable-next-line no-plusplus
            age--;
        }
        return age;
    };

    const pickPassport = (file: File) => {
        setIsLoading(true);
		Tesseract.recognize(file, 'ukr')
			.then(({ data: { text } }) => {
				const dates = text.match(/\b(\d{2} \d{2} \d{4})/) || [];
                const bday = dates[0].replace(/(\d+[ ])(\d+[ ])/, '$2$1');
                const age = getAge(bday);

                if (age > 14) {
                    setDob(true);
                }

                setIsLoading(false);
			});
	};

	const handleSignUp = async (credentials: SignUpValues) => {
        const {
            email, password, username, fullName
        } = credentials;

        if (!dob) {
            enqueueSnackbar('Ви повинні бути старше 14 років', { variant: 'error' });
            return;
        }

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

                enqueueSnackbar('Ваш акаунт було створено', { variant: 'success' });
                navigate(ROUTES.SIGNIN);
            } catch (error: unknown) {
                enqueueSnackbar((error as Error).message, { variant: 'error' });
            }
        } else if (emailExists) {
                enqueueSnackbar('Користувач з такою поштою вже існує', { variant: 'error' });
            } else {
                enqueueSnackbar('Користувач з таким ім\'ям користувача вже існує', { variant: 'error' });
            }
    };

	const containerProps = () => ({
        isLoading
    });

	const containerFunctions = {
        handleSignUp,
        pickPassport
    };

	return <SignUpComponent {...containerProps()} {...containerFunctions} />;
};

export default NavigationContainer;
