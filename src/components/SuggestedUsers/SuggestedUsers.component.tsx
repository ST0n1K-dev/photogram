import React from 'react';
import SuggestedUserProfile from 'Component/SuggestedUserProfile';

import { SuggestedUsersComponentInterface } from './SuggestedUsers.config';

import './SuggestedUsers.style.scss';

const SuggestedUsersComponent = (props: SuggestedUsersComponentInterface): any => {
	const {
    profiles, currentUserId, currentUserDocId, setFollowing
  } = props;

  if (!profiles.length) {
    return null;
  }

	return (
    <>
      <h4>Check out this ninjas</h4>
      <div className="SuggestedUsers__Wrapper">
        { profiles.map((profile) => {
          const {
            username, docId, userId: suggestedUserId, fullName
          } = profile;

          return (
            <SuggestedUserProfile
              key={suggestedUserId}
              username={username}
              fullName={fullName}
              suggestedUserDocId={docId}
              currentUserDocId={currentUserDocId}
              suggestedUserId={suggestedUserId}
              currentUserId={currentUserId}
              setFollowing={setFollowing}
            />
          );
        })}
      </div>
    </>
  );
};

export default SuggestedUsersComponent;
