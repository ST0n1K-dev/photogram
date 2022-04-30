import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByUsername } from 'Util/firebase';
import { User } from 'Type/User';
import * as ROUTES from 'Type/routes';

import ProfileComponent from './Profile.component';

const ProfileContainer = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function isUserExists() {
      const receivedUser = await getUserByUsername(username!);

      if (receivedUser.length) {
        setUser(receivedUser[0]);
      } else {
        navigate(ROUTES.NOTFOUND);
      }
    }

    isUserExists();
  }, [username, navigate]);

  const containerProps = () => ({
    user
  });

  const containerFunctions = {};

  return (
    <ProfileComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default ProfileContainer;
