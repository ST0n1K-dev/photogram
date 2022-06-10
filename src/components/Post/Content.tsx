/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Button, Input, Autocomplete, TextField
} from '@mui/material';

import { categoriesList } from 'Component/PostForm/PostForm.config';
import { RootState } from '../../redux/store';

import { PostContentInterface, PostCategoryInterface } from './Post.config';

interface PostCaptionInterface {
    caption: string,
    category: string,
    isPostEditMode: boolean,
    updatePostCaption?: (caption: string) => void,
    updatePostCategory?: (category: string) => void,
    exitPostEditMode?: () => void,
}

const PostCategory = (props: PostCategoryInterface) => {
    const { category, updatePostCategory } = props;

    const [postCategory, setPostCategory] = useState<string>(category);

    const handlePostCategoryChange = (value: string) => {
        setPostCategory(value);
    };

    return (
        <Autocomplete
          disablePortal
          value={postCategory}
          onChange={(event: any, newValue: string | null) => {
            handlePostCategoryChange(newValue as string);
            if (updatePostCategory) {
                updatePostCategory(newValue as string);
            }
          }}
          id="post-category"
          options={categoriesList}
          sx={{ width: 300, margin: '20px auto' }}
          renderInput={(params) => <TextField {...params} label="Категорія" />}
        />
    );
};

const PostCaption = ({
    caption, isPostEditMode, updatePostCaption, exitPostEditMode, category, updatePostCategory
}: PostCaptionInterface) => {
    const [postCaption, setPostCaption] = useState<string>(caption);

    const handlePostCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostCaption(event.target.value);
    };

    const onSubmit = () => {
        if (updatePostCaption) {
            updatePostCaption(postCaption);
        }
    };

    const onExit = () => {
        setPostCaption(caption);
        if (exitPostEditMode) {
            exitPostEditMode();
        }
    };

    if (!isPostEditMode) {
        return <span className="Post__Content--caption">{postCaption}</span>;
    }

    return (
        <div
            className="Post__Content--captionEditWrapper"
            style={{ margin: '10px 0', textAlign: 'right' }}
        >
            <Input
                className="Post__Content--captionEdit"
                style={{ width: '100%', marginBottom: '10px' }}
                placeholder="Описання публікації..."
                value={postCaption}
                onChange={handlePostCaptionChange}
            />
            <PostCategory category={category} updatePostCategory={updatePostCategory} />
            <Button style={{ margin: '0 10px' }} onClick={onSubmit} variant="contained">Оновити</Button>
            <Button style={{ margin: '0 10px' }} onClick={onExit} variant="outlined">Відміна</Button>
        </div>
    );
};

const PostContent = ({
    username, caption, category, updatePostCaption, exitPostEditMode, updatePostCategory
}: PostContentInterface) => {
    const isPostEditMode = useSelector((state: RootState) => state.PostActions.isPostEditMode);

    return (
        <div className={isPostEditMode ? 'Post__Content--editMode' : 'Post__Content'}>
            <b className="Post__Content--username">{username}</b>
            <PostCaption
                caption={caption}
                updatePostCaption={updatePostCaption}
                exitPostEditMode={exitPostEditMode}
                isPostEditMode={isPostEditMode}
                category={category}
                updatePostCategory={updatePostCategory}
            />
        </div>
    );
};

export default PostContent;
