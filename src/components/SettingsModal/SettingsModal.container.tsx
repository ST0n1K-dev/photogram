/* eslint-disable @typescript-eslint/no-shadow */
import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'Store/SelectedProfile';
import { ref, uploadBytes } from 'firebase/storage';
import { User } from 'Type/User';
import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';
import { getUserAvatar } from 'Util/firebase';
import { RootState } from '../../redux/store';

import SettingsModalComponent from './SettingsModal.component';

import { SettingsModalContainerInterface, UserFormInterface } from './SettingsModal.config';

const SettingsModalContainer = (props: SettingsModalContainerInterface) => {
  const {
    fullName,
    username,
    avatar,
    description,
    docId,
    isShowing,
    onClose
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state: RootState) => state.MyAccount.user);
  const dispatch = useDispatch();

  const { firebase, storage } = useContext(FirebaseContext) as FirebaseContextInterface;

  const uploadAvatar = async (avatar: any) => {
    if (avatar === null) return;

    const imageRef = ref(storage, `avatars/${username}/avatar`);
    await uploadBytes(imageRef, avatar);
  };

  const handleUpdateProfile = async (values: UserFormInterface) => {
    try {
      const { fullName, description, avatar } = values;
      await firebase.firestore().collection('users')
        .doc(docId).update({
          fullName,
          description
        });

      if (avatar && avatar !== (user as User)?.avatar) {
        await uploadAvatar(avatar!);
        const imagePath = await getUserAvatar(username);

        dispatch(updateUser({ avatar: imagePath }));
      }

      dispatch(updateUser({ fullName: values.fullName, description: values.description! }));

      onClose();

      enqueueSnackbar('Profile info has been updated', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    }
  };

  const containerProps = () => ({
    isShowing,
    fullName,
    description,
    avatar
  });

  const containerFunctions = {
    onClose,
    handleUpdateProfile
  };

  return (
    <SettingsModalComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default SettingsModalContainer;
