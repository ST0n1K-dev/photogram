import { ref, getDownloadURL, getMetadata } from 'firebase/storage';
import { User } from 'Type/User';
import { PostInterface } from 'Type/Post';
import { FieldValue, firebase, storage } from '../lib/firebase';

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

export const getUsersById = async (userIds: Array<string>) => {
    if (userIds.length < 1) {
        return [];
    }

    const response = await firebase
		.firestore()
		.collection('users')
		.where('userId', 'in', userIds)
        .get();

    return response.docs.map((post) => ({
        ...post.data()
    }));
};

export const getUserByUsername = async (username: string): Promise<Array<User>> => {
    const response = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return response.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    } as User));
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

export const getPosts = async (userId: string, following: Array<string>) => {
    const response = await firebase
		.firestore()
		.collection('posts')
		.where('userId', 'in', following)
        .get();

    const followedUsersPosts: any = response.docs.map((post) => ({
        ...post.data(),
        docId: post.id
    }));

    const detailedPosts: Array<PostInterface> = await Promise.all(
        followedUsersPosts.map(async (post: any) => {
            let isLiked = false;
            if (post.likes.includes(userId)) {
                isLiked = true;
            }

            const user: any = await getUserById(post.userId);
            const { username } = user[0];

            return { username, ...post, isLiked };
        })
    );

    return detailedPosts;
};

export const getDetailedPost = async (userId: string, postId: number) => {
    const response = await firebase
		.firestore()
		.collection('posts')
		.where('photoId', '==', postId)
        .get();

    const followedUsersPosts: any = response.docs.map((post) => ({
        ...post.data(),
        docId: post.id
    }));

    const detailedPost: Array<PostInterface> = await Promise.all(
        followedUsersPosts.map(async (post: any) => {
            let isLiked = false;
            if (post.likes.includes(userId)) {
                isLiked = true;
            }

            const user: any = await getUserById(post.userId);
            const { username } = user[0];

            return { username, ...post, isLiked };
        })
    );

    return detailedPost[0];
};

export const getUserPosts = async (user: User): Promise<Array<PostInterface>> => {
    const response = await firebase
		.firestore()
		.collection('posts')
		.where('userId', '==', user.userId)
        .get();

    return response.docs.map((post) => ({
        ...post.data(),
        docId: post.id
    } as PostInterface)).sort((a, b) => b.dateCreated - a.dateCreated);
};

export const getIsFollowingProfile = async (
	currentUsername: string,
	userId: string
): Promise<boolean> => {
	const response = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', currentUsername)
		.where('following', 'array-contains', userId)
		.get();

	return response.docs.map((user) => user.data().length > 0).length > 0;
};

export const getUserAvatar = (username: string) => {
    try {
        const path = ref(storage, `avatars/${username}/avatar`);

        if (path) {
            return getDownloadURL(path)
                .then((foundURL) => foundURL, () => '');
        }

        return '';
    } catch {
        return '';
    }
};

export const createPost = async (userId: string, caption: string) => {
    const { id: postId } = await firebase
		.firestore()
		.collection('posts')
        .add({
            caption,
            comments: [],
            dateCreated: Date.now(),
            likes: [],
            userId,
            photoId: +(new Date().getTime().toString())
        });

    return postId;
};

export const getPostImage = async (username: string, postDocId: string) => {
    const path = ref(storage, `posts/${username}/${postDocId}`);

    const metadata = await getMetadata(path);
    const content = await getDownloadURL(path);

    return {
        content,
        metadata
    };
};

export const searchUsersByUsername = async (username: string): Promise<Array<User>> => {
    const responseByUsername = await firebase
        .firestore()
        .collection('users')
        .where('username', '>=', username)
        .where('username', '<=', `${username}~`)
        .get();

    const responseByName = await firebase
        .firestore()
        .collection('users')
        .where('fullName', '>=', username)
        .where('fullName', '<=', `${username}~`)
        .get();

    return [...responseByUsername.docs, ...responseByName.docs]
        .filter((v, i, a) => a.indexOf(v) === i)
        .map((user) => ({
        ...user.data(),
        docId: user.id
    } as User));
};
