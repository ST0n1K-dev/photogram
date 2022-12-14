/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
	Avatar, Skeleton, Button, IconButton
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

import { handleFollow } from 'Store/MyAccount';
import { handleSelectedAccountFollow } from 'Store/SelectedProfile';
import SettingsModal from 'Component/SettingsModal';
import {
    getIsFollowingProfile,
    updateCurrentUserFollowing,
    updateFollowedUserFollowers
} from 'Util/firebase';
import useUser from 'Hook/useUser';
import useModal from 'Hook/useModal';

import { User } from 'Type/User';

import FollowersModal from './FollowersModal';

import { UserHeroInterface } from './Profile.config';

const UserHero: React.FC<UserHeroInterface> = (props) => {
	const {
        profile = {},
		postsTotal = 0,
		totalFollowers = 0,
		followersPopupOpen,
		followingPopupOpen,
		followers = [],
		following = [],
		fullName = '',
		description = '',
		avatar,
		dispatch
    } = props;

	const {
        userId: profileUserId = '',
        docId: profileUserDocId = '',
		username = '',
	} = (profile as User) || {};

	const { isShowing, toggle } = useModal();
	const storeDispatch = useDispatch();
	const { user: currentUser } = useUser();
    const {
        docId: currentUserDocId = '',
        userId: currentUserId = '',
        username: currentUsername = ''
    } = (currentUser as User) || {};

	const [isFollowing, setIsFollowing] = React.useState<boolean>(false);

    const isMe = username && (currentUser as User)?.username === username;

	const handleFollowersPopupOpen = () => {
		dispatch({ followersPopupOpen: true });
	};

	const handleFollowingPopupOpen = () => {
		dispatch({ followingPopupOpen: true });
	};

    const handleFollowClick = async () => {
        setIsFollowing((isFollowing) => !isFollowing);
        storeDispatch(handleFollow({ isFollowing, profileUserId }));
        storeDispatch(handleSelectedAccountFollow({ isFollowing, currentUserId }));

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
			{ username ? <Avatar alt="Remy Sharp" src={avatar || '/images/avatar.png'} /> : <Skeleton variant="circular" width={150} height={150} /> }
			<div className="Profile__Details">
				<div className="Profile__Details--username">
					{username ? (
						<h2>{username}</h2>
					) : (
						<Skeleton variant="text" animation="wave" />
					)}
                    {username && !isMe && (
                        <Button className={isFollowing ? 'Profile__FollowButton--following' : ''} variant="contained" onClick={handleFollowClick}>
                            { isFollowing ? '??????????????????????' : '??????????????????????'}
                        </Button>
                    )}
					{ isMe && (
						<IconButton onClick={toggle}>
							<SettingsIcon />
						</IconButton>
					)}
				</div>
				{username ? (
					<div className="Profile__Details--statistics">
						<p className="Profile__Details--stat">
							<b>{postsTotal}</b> ????????????????????
						</p>
						<button type="button" className="Profile__Details--button" onClick={handleFollowersPopupOpen}>
							<p className="Profile__Details--stat">
								<b>{totalFollowers}</b> ??????????????????????
							</p>
						</button>
						<button type="button" className="Profile__Details--button" onClick={handleFollowingPopupOpen}>
							<p className="Profile__Details--stat">
								<b>{following?.length}</b> ??????????????
							</p>
						</button>
					</div>
				) : (
					<Skeleton variant="text" animation="wave" />
				)}
				<div className="Profile__Details--userDetails">
					{username ? (
						<>
							<p>{description}</p>
							<h4>{fullName}</h4>
						</>
					) : (
						<Skeleton variant="text" animation="wave" />
					)}
				</div>
			</div>
			<FollowersModal
				isOpen={followersPopupOpen!}
				onClose={() => dispatch({ followersPopupOpen: false })}
				followers={followers || []}
				type="followers"
			/>
			<FollowersModal
				isOpen={followingPopupOpen!}
				onClose={() => dispatch({ followingPopupOpen: false })}
				followers={following || []}
				type="following"
			/>
			{ isMe && (
				<SettingsModal
					isShowing={isShowing}
					username={username}
					avatar={avatar}
					fullName={fullName}
					description={description}
					docId={currentUserDocId}
					userId={currentUserId}
					onClose={toggle}
				/>
			)}
		</div>
	);
};

export default UserHero;
