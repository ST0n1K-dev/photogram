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
