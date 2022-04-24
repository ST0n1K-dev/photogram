import { User } from 'Type/User';
import { FieldValue, firebase } from '../lib/firebase';

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

export const updateCurrentUserFollowing = async (
	currentUserDocId: string,
	profileId: string, // who to follow
	isFollowing: boolean
) => firebase
		.firestore()
		.collection('users')
		.doc(currentUserDocId)
		.update({
			following: isFollowing
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId),
		});

export const updateFollowedUserFollowers = async (
	suggestedUserDocId: string,
	currentUserId: string, // who to add to followers
	isFollowing: boolean
) => firebase
		.firestore()
		.collection('users')
		.doc(suggestedUserDocId)
		.update({
			followers: isFollowing
				? FieldValue.arrayRemove(currentUserId)
				: FieldValue.arrayUnion(currentUserId),
		});
