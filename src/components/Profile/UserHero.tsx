/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Avatar, Skeleton, Button } from '@mui/material';

import {
    getIsFollowingProfile,
    updateCurrentUserFollowing,
    updateFollowedUserFollowers
} from 'Util/firebase';
import useUser from 'Hook/useUser';
import { User } from 'Type/User';

import FollowersModal from './FollowersModal';

import { UserHeroInterface } from './Profile.config';

const UserHero: React.FC<UserHeroInterface> = (props) => {
	const {
        profile = {},
		postsTotal = 0,
		totalFollowers = 0,
		followersPopupOpen,
		dispath
    } = props;

	const {
        userId: profileUserId = '',
        docId: profileUserDocId = '',
		username = '',
		fullName = '',
		following = [],
	} = (profile as User) || {};

	const { user: currentUser } = useUser();
    const {
        docId: currentUserDocId = '',
        userId: currentUserId = '',
        username: currentUsername = ''
    } = (currentUser as User) || {};

	const [isFollowing, setIsFollowing] = React.useState<boolean>(false);

    const isFollowAvailable = username && (currentUser as User)?.username !== username;

	const handlePopupOpen = () => {
		dispath({ followersPopupOpen: true });
	};

    const handleFollowClick = async () => {
        setIsFollowing((isFollowing) => !isFollowing);
        dispath({
            totalFollowers: isFollowing ? totalFollowers! - 1 : totalFollowers! + 1
        });

        await updateCurrentUserFollowing(currentUserDocId, profileUserId, isFollowing);
        await updateFollowedUserFollowers(profileUserDocId, currentUserId, isFollowing);
    };

	React.useEffect(() => {
		const getIsLoggedInUserFollower = async () => {
			const isUserFollowing = await getIsFollowingProfile(currentUsername, profileUserId);
			setIsFollowing(isUserFollowing);
		};

		if ((currentUser as User)?.username && (profile as User)?.userId) {
			getIsLoggedInUserFollower();
		}
	}, [profile, currentUser, currentUsername, profileUserId]);

	return (
		<div className="Profile__UserHero">
			{ username ? <Avatar alt="Remy Sharp" src="/images/avatar.png" /> : <Skeleton variant="circular" width={150} height={150} /> }
			<div className="Profile__Details">
				<div className="Profile__Details--username">
					{username ? (
						<h2>{username}</h2>
					) : (
						<Skeleton variant="text" animation="wave" />
					)}
                    {username && isFollowAvailable && (
                        <Button className={isFollowing ? 'Profile__FollowButton--following' : ''} variant="contained" onClick={handleFollowClick}>
                            { isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    )}
				</div>
				{username ? (
					<div className="Profile__Details--statistics">
						<p className="Profile__Details--stat">
							<b>{postsTotal}</b> posts
						</p>
						<button type="button" className="Profile__Details--button" onClick={handlePopupOpen}>
							<p className="Profile__Details--stat">
								<b>{totalFollowers}</b> followers
							</p>
						</button>
						<button type="button" className="Profile__Details--button">
							<p className="Profile__Details--stat">
								<b>{following.length}</b> following
							</p>
						</button>
					</div>
				) : (
					<Skeleton variant="text" animation="wave" />
				)}
				<div className="Profile__Details--userDetails">
					{username ? (
						<h4>{fullName}</h4>
					) : (
						<Skeleton variant="text" animation="wave" />
					)}
				</div>
			</div>
			<FollowersModal
				isOpen={followersPopupOpen!}
				onClose={() => dispath({ followersPopupOpen: false })}
				followers={(profile as User)?.followers}
				type="followers"
			/>
		</div>
	);
};

export default UserHero;
