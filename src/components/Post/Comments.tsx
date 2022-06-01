import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import PostModal from 'Component/PostModal';
import useModal from 'Hook/useModal';

import AddComment from './AddComment';

import { PostCommentsInterface } from './Post.config';

const PostComments = (props: PostCommentsInterface) => {
    const { isShowing, toggle } = useModal();
	const {
        comments, dateCreated, docId, handleAddComment, commentInput, post
    } = props;

	return (
        <>
        <p className="Post__Comment--title">Коментарі</p>
        { comments.slice(0, 2).map(({ comment, displayName }) => (
            <div key={`${displayName}${comment}`} className="Post__Comment">
                <Link to={`/profile/${displayName}`}>
                    <b className="Post__Comment--username">{displayName}</b>
                </Link>
                <span className="Post__Comment--commentBody">{comment}</span>
            </div>
        )) }
        { comments.length > 2 && (
            <Button
                className="Post__Comment--viewAll"
                onClick={toggle}
            >
                Переглянути всі коментарі
            </Button>
        )}
        <AddComment
            docId={docId}
            comments={comments}
            addComment={handleAddComment}
            commentInput={commentInput}
        />
        <p className="Post__Comment--date">{formatDistanceToNow(dateCreated)} ago</p>
        {post && <PostModal isShowing={isShowing} post={post} onClose={toggle} /> }
        </>
    );
};

export default PostComments;
