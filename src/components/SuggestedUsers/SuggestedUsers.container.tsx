import React, { useEffect, useState } from 'react';
import { User } from 'Type/User';
import { getSuggestedProfiles } from 'Util/firebase';
import SuggestedUsersComponent from './SuggestedUsers.component';
import { SuggestedUsersInterface } from './SuggestedUsers.config';

const SuggestedUsersContainer: React.FC<SuggestedUsersInterface> = (props) => {
	const { userId, following } = props;
	const [profiles, setProfiles] = useState<Array<User>>([]);

	useEffect(() => {
		async function getSuggestedUsers() {
			const suggestedProfiles = await getSuggestedProfiles(
				userId,
				following
			);
			setProfiles(suggestedProfiles as Array<User>);
		}

		if (userId) {
			getSuggestedUsers();
		}
	}, [userId, following]);

	const containerProps = () => ({
    profiles
  });

	const containerFunctions = {};

	return (
		<SuggestedUsersComponent
			{...containerProps()}
			{...containerFunctions}
		/>
	);
};

export default SuggestedUsersContainer;
