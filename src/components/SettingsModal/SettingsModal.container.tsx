/* eslint-disable @typescript-eslint/no-shadow */
import React, { useContext } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { useSnackbar } from 'notistack';
import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';
import { getUserAvatar } from 'Util/firebase';

import SettingsModalComponent from './SettingsModal.component';

import { SettingsModalContainerInterface, UserFormInterface } from './SettingsModal.config';

const SettingsModalContainer = (props: SettingsModalContainerInterface) => {
  const {
    fullName,
    username,
    description,
    docId,
    isShowing,
    onClose,
    dispatch
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { firebase, storage } = useContext(FirebaseContext) as FirebaseContextInterface;

  const uploadAvatar = async (avatar: File) => {
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

      if (avatar) {
        await uploadAvatar(avatar!);
        const imagePath = await getUserAvatar(username);

        dispatch({ avatar: imagePath });
      }

      dispatch({ fullName: values.fullName, description: values.description });

      onClose();

      enqueueSnackbar('Profile info has been updated', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    }
  };

  const containerProps = () => ({
    isShowing,
    fullName,
    description
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
