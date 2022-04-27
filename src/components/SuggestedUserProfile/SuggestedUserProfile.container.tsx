import React, { useState } from 'react';

import { updateCurrentUserFollowing, updateFollowedUserFollowers } from 'Util/firebase';
import { SuggestedUserProfileContainerInterface } from './SuggestedUserProfile.config';
import SuggestedUserProfileComponent from './SuggestedUserProfile.component';

const SuggestedUserProfileContainer: React.FC<SuggestedUserProfileContainerInterface> = (props) => {
  const {
    username, suggestedUserId, currentUserId, suggestedUserDocId, fullName, currentUserDocId
  } = props;

  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  const followUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFollowed(true);

    await updateCurrentUserFollowing(currentUserDocId, suggestedUserId, isFollowed);
    await updateFollowedUserFollowers(suggestedUserDocId, currentUserId, isFollowed);
  };

  const containerProps = () => ({
    isFollowed,
    username,
    fullName
  });

  const containerFunctions = {
    followUser
  };

  return (
    <SuggestedUserProfileComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default SuggestedUserProfileContainer;
