import * as Yup from 'yup';

export interface SettingsModalContainerInterface {
    fullName: string
    username: string
    avatar: string
    description: string
    docId: string
    userId: string
    isShowing: boolean
    onClose: () => void
}

export interface SettingsModalComponentInterface {
    isShowing: boolean
    onClose: () => void
    fullName: string
    description?: string
    avatar: string,
    handleUpdateProfile: (values: UserFormInterface) => void
}

export interface UserFormInterface {
    fullName: string,
    description?: string,
    avatar?: string
}

export const ProfileSettingsSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Занадто коротке')
      .max(50, 'Занадто довге!')
      .matches(/[a-zA-Z]/, 'Лише латинські букви.')
      .required('Це поле є обов\'язковим'),
    description: Yup.string()
        .max(120, 'Занадто довгий опис!')
  });
