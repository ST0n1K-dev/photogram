import * as Yup from 'yup';

export interface FormValues {
    postPicture: string
    caption: string
}

export interface PostFormContainerInterface {
    postPicture: string
    isLoading: boolean
    caption: string
    handleSubmit: (values: FormValues) => void
    handlePictureSet: (src: File) => void
}

export interface PostFormComponentInterface {
    postPicture: string
    caption: string
    isLoading: boolean
    handleSubmit: (values: FormValues) => void
    handlePictureSet: (src: File) => void
}

export const CreatePostSchema = Yup.object().shape({
    postPicture: Yup.string().required('Необхідно вибрати фото або відео'),
    caption: Yup.string()
        .max(1000, 'Занадто великий опис!')
        .required('Опис є обов\'язковим')
});
