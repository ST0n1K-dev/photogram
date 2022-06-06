import React from 'react';
import * as Yup from 'yup';

export interface CreatePostContainerInterface {
    test?: string
}

export interface CreatePostComponentInterface extends CreatePostForm {
    handleCreatePost: (values: CreatePostForm) => void
    dispatch: React.Dispatch<CreatePostForm>
}

export interface CreatePostForm {
    caption?: string
    postPicture?: any
    isLoading?: boolean
}

export const CreatePostSchema = Yup.object().shape({
    postPicture: Yup.string().required(),
    caption: Yup.string()
        .max(1000, 'Занадто довгий опис!')
        .required('Опис є обов\'язковим')
});
