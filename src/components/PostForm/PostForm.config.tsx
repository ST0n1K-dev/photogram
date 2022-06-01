import * as Yup from 'yup';

export interface FormValues {
    postPicture: string
    caption: string
}

export interface PostFormContainerInterface {
    postPicture: string
    caption: string
    handleSubmit: (values: FormValues) => void
    handlePictureSet: (src: File) => void
}

export interface PostFormComponentInterface {
    postPicture: string
    caption: string
    handleSubmit: (values: FormValues) => void
    handlePictureSet: (src: File) => void
}

export const CreatePostSchema = Yup.object().shape({
    postPicture: Yup.string().required('You need to select a picture'),
    caption: Yup.string()
        .max(1000, 'Too Long!')
        .required('Caption is required')
});
