import React, { useState } from 'react';
import { Button, Input } from '@mui/material';

import { AddCommentInterface } from './Post.config';

const PostAddComment = (props: AddCommentInterface) => {
    const { addComment, commentInput } = props;
    const [comment, setComment] = useState<string>('');

    const onSubmit = (e: React.SyntheticEvent) => {
        if (!comment.length) {
            return e.preventDefault();
        }

        addComment(e, comment);

        setComment('');

        return true;
    };

    const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    return (
        <div className="Post__CommentInputWrapper">
            <form
                className="Post__CommentInputForm"
                method="POST"
                onSubmit={onSubmit}
            >
                <Input
                    placeholder="Add a comment"
                    autoComplete="off"
                    type="text"
                    name="comment-field"
                    value={comment}
                    ref={commentInput!}
                    onChange={onChangeComment}
                />
                <Button
                    variant="text"
                    type="submit"
                    disabled={!comment.length}
                >
                    Comment
                </Button>
            </form>
        </div>
    );
};

export default PostAddComment;
