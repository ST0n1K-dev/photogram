import React from 'react';
import SuggestedUserProfile from 'Component/SuggestedUserProfile';

import { SuggestedUsersComponentInterface } from './SuggestedUsers.config';

import './SuggestedUsers.style.scss';

const SuggestedUsersComponent = (props: SuggestedUsersComponentInterface): any => {
	const { profiles, currentUserId, currentUserDocId } = props;

	return (
    <>
      <h4>Check out this ninjas</h4>
      <div className="SuggestedUsers__Wrapper">
        { !profiles.length && <h5>No ninjas detected</h5> }
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
            />
          );
        })}
      </div>
    </>
  );
};

export default SuggestedUsersComponent;
