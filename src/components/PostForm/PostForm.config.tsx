import * as Yup from 'yup';

export interface FormValues {
    postPicture: string
    caption: string
}

export interface PostFormContainerInterface {
    postPicture: string
    isLoading: boolean
    caption: string
    postCategory: string
    handleSubmit: (values: FormValues) => void
    handlePictureSet: (src: File) => void
}

export interface PostFormComponentInterface {
    postPicture: string
    caption: string
    postCategory: string
    isLoading: boolean
    handleSubmit: (values: FormValues) => void
    handlePictureSet: (src: File) => void
}

export const CreatePostSchema = Yup.object().shape({
    postPicture: Yup.string().required('Необхідно вибрати фото або відео'),
    caption: Yup.string()
        .max(1000, 'Занадто великий опис!')
        .required('Опис є обов\'язковим'),
    postCategory: Yup.string().default('Інше')
});

export const categoriesList = [
    'Люди',
    'Обличчя/тіло',
    'Фотосессія',
    'Лайфстайл',
    'Краса та здоров\'я',
    'Спорт',
    'Хоббі',
    'Робота',
    'Заходи',
    'Подорожі',
    'Тварини',
    'Рослини',
    'Їжа',
    'Мода',
    'Авто',
    'Пляж',
    'Інтер\'єр',
    'Відео',
    'Ніч',
    'Музика',
    'Дім',
    'Кохання',
    'Інше',
];
