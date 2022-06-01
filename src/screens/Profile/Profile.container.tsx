import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByUsername, getUserPosts, getUserAvatar } from 'Util/firebase';
import { setUser, setUserPosts } from 'Store/SelectedProfile';
import * as ROUTES from 'Type/routes';
import { RootState } from '../../redux/store';

import ProfileComponent from './Profile.component';

const ProfileContainer = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.SelectedProfile.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function isUserExists() {
      setIsLoading(true);
      const receivedUser = await getUserByUsername(username!);

      if (receivedUser.length) {
        const currentUser = receivedUser[0];
        const userAvatar = await getUserAvatar(username!);
        const receivedPosts = await getUserPosts(currentUser);

        dispatch(setUser({ ...currentUser, avatar: userAvatar }));
        dispatch(setUserPosts(receivedPosts));
      } else {
        dispatch(setUser({}));
        navigate(ROUTES.NOTFOUND);
      }
      setIsLoading(false);
    }

    isUserExists();
  }, [username, dispatch, navigate]);

  const containerProps = () => ({
    user,
    isLoading
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
