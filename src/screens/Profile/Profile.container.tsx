import React, { useEffect } from 'react';
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

  useEffect(() => {
    async function isUserExists() {
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
    }

    isUserExists();
  }, [username, dispatch, navigate]);

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
