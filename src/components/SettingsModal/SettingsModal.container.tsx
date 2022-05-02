import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';

import SettingsModalComponent from './SettingsModal.component';

import { SettingsModalContainerInterface, UserFormInterface } from './SettingsModal.config';

const SettingsModalContainer = (props: SettingsModalContainerInterface) => {
  const {
    fullName,
    description,
    docId,
    isShowing,
    onClose,
    dispatch
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { firebase } = useContext(FirebaseContext) as FirebaseContextInterface;

  const handleUpdateProfile = async (values: UserFormInterface) => {
    try {
      await firebase.firestore().collection('users')
        .doc(docId).update({
          ...values
        });

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
