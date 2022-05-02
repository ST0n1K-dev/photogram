import { ReducerStateInterface } from 'Component/Profile/Profile.config';
import React from 'react';
import * as Yup from 'yup';

export interface SettingsModalContainerInterface {
    fullName: string
    description: string
    docId: string
    isShowing: boolean
    onClose: () => void
    dispatch: React.Dispatch<ReducerStateInterface>
}

export interface SettingsModalComponentInterface {
    isShowing: boolean
    onClose: () => void
    fullName: string
    description?: string
    handleUpdateProfile: (values: UserFormInterface) => void
}

export interface UserFormInterface {
    fullName: string,
    description?: string
}

export const ProfileSettingsSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(10, 'Too Short!')
      .max(40, 'Too Long!')
      .matches(/[a-zA-Z]/, 'Username latin letters only.')
      .required('Required'),
    description: Yup.string()
        .max(120, 'Too Long!')
  });
