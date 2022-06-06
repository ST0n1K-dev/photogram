/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from '@mui/material';

import { RootState } from '../../redux/store';

import { PostContentInterface } from './Post.config';

interface PostCaptionInterface {
    caption: string,
    isPostEditMode: boolean,
    updatePostCaption?: (caption: string) => void,
    exitPostEditMode?: () => void
}

const PostCaption = ({
    caption, isPostEditMode, updatePostCaption, exitPostEditMode
}: PostCaptionInterface) => {
    const [postCaption, setPostCaption] = useState<string>(caption);

    const handlePostCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostCaption(event.target.value);
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
            <Button style={{ margin: '0 10px' }} onClick={() => updatePostCaption && updatePostCaption(postCaption)} variant="contained">Оновити</Button>
            <Button style={{ margin: '0 10px' }} onClick={exitPostEditMode} variant="outlined">Відміна</Button>
        </div>
    );
};

const PostContent = ({
    username, caption, updatePostCaption, exitPostEditMode
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
            />
        </div>
    );
};

export default PostContent;
