import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Skeleton } from '@mui/material';
import { User } from 'Type/User';

import { SuggestedUsersComponentInterface } from './SuggestedUsers.config';

import './SuggestedUsers.style.scss';

const renderUsers = (profiles: Array<User>) => profiles.map((profile) => {
    const { username, fullName } = profile;
    return (
			<Link
				key={username}
				className="SuggestedUsers--link"
				to={`/profile/${profile.username}`}
			>
				<div className="SuggestedUsers">
					<Avatar alt="Remy Sharp" src="/images/avatar.png" />
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
							<Button variant="text">Follow</Button>
						</div>
					</div>
				</div>
			</Link>
		);
  });

const SuggestedUsersComponent = (props: SuggestedUsersComponentInterface): any => {
	const { profiles } = props;

	if (!profiles.length) {
		return <Skeleton variant="text" animation="wave" height={350} />;
	}

	return (
    <>
      <h4>Check out this ninjas</h4>
      <div className="SuggestedUsers__Wrapper">
        { renderUsers(profiles) }
      </div>
    </>
  );
};

export default SuggestedUsersComponent;
