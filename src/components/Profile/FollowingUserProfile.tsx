import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

import { User } from 'Type/User';
import useUser from 'Hook/useUser';
import { useUserAvatar } from 'Hook/useUserAvatar';

import { UserProfileInterface } from './Profile.config';

const FollowingUserProfile = (props: UserProfileInterface) => {
	const { fullName, username } = props;
	const { user } = useUser();
	const { avatar } = useUserAvatar(username);
	const { username: currentUsername = '' } = (user as User) || {};
	return (
		<Link to={`/profile/${username}`}>
			<div className="FollowingUser">
				<Avatar alt="Remy Sharp" src={avatar || '/images/avatar.png'} />
				<div className="FollowingUser__InfoWrapper">
					<div className="FollowingUser__Info">
						<h5 className="FollowingUser__Info--title">
							{fullName}
						</h5>
						<span className="FollowingUser__Info--username">
							{username}
						</span>
					</div>
					<div className="FollowingUser__Action">
						{currentUsername === username && (
							<span>Це ви</span>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default FollowingUserProfile;
