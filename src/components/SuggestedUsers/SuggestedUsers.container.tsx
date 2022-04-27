import React, { useEffect, useState } from 'react';
import { User } from 'Type/User';
import { getSuggestedProfiles } from 'Util/firebase';
import SuggestedUsersComponent from './SuggestedUsers.component';
import { SuggestedUsersInterface } from './SuggestedUsers.config';

const SuggestedUsersContainer: React.FC<SuggestedUsersInterface> = (props) => {
	const { currentUserId, following, currentUserDocId } = props;
	const [profiles, setProfiles] = useState<Array<User>>([]);

	useEffect(() => {
		async function getSuggestedUsers() {
			const suggestedProfiles = await getSuggestedProfiles(
				currentUserId,
				following
			);
			setProfiles(suggestedProfiles as Array<User>);
		}

		if (currentUserId) {
			getSuggestedUsers();
		}
	}, [currentUserId, following]);

	const containerProps = () => ({
    profiles,
    currentUserDocId,
    currentUserId
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
