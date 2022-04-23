import { User } from 'Type/User';
import { firebase } from '../lib/firebase';

export const isUserExists = async (username: string) => {
    const response = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return response.docs.map((user) => user.data().length > 0).length > 0;
};

export const isEmailExists = async (email: string) => {
    const response = await firebase
        .firestore()
        .collection('users')
        .where('emailAddress', '==', email)
        .get();

    return response.docs.map((user) => user.data().length > 0).length > 0;
};

export const getUserById = async (userId: string) => {
    const response = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    return response.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }));
};

export const getSuggestedProfiles = async (userId: string, following: Array<string>) => {
    const response = await firebase
        .firestore()
        .collection('users')
        .limit(5)
        .get();

    return response.docs.map((user) => ({
		...user.data(),
		docId: user.id,
	})).filter((user) => (user as User).userId !== userId
        && !following.includes((user as User).userId));
};
