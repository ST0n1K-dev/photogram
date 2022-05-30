import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import { useUserAvatar } from 'Hook/useUserAvatar';

import { SuggestedUserProfileComponentInterface } from './SuggestedUserProfile.config';
import './SuggestedUserProfile.style.scss';

const SuggestedUserProfileComponent: React.FC<SuggestedUserProfileComponentInterface> = (props) => {
  const {
    username, fullName, isFollowed, followUser
  } = props;

  const { avatar } = useUserAvatar(username);

  if (isFollowed) {
    return null;
  }

  return (
		<Link
			key={username}
			className="SuggestedUsers--link"
			to={`/profile/${username}`}
		>
			<div className="SuggestedUsers">
				<Avatar alt="Remy Sharp" src={avatar || '/images/avatar.png'} />
				<div className="SuggestedUsers__InfoWrapper">
					<div className="SuggestedUsers__Info">
						<h5 className="SuggestedUsers__Info--title">
							{fullName}
						</h5>
						<span className="SuggestedUsers__Info--username">
							@{username}
						</span>
					</div>
					<div className="SuggestedUsers__Action">
						<Button onClick={followUser} variant="text">
							Follow
						</Button>
					</div>
				</div>
			</div>
		</Link>
  	);
};

export default SuggestedUserProfileComponent;
