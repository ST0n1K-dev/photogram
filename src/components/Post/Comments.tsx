import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

import { PostCommentsInterface } from './Post.config';

const PostComments = (props: PostCommentsInterface) => {
	const { comments, dateCreated, docId } = props;

	return (
        <>
        <p className="Post__Comment--title">Comments</p>
        { comments.slice(0, 2).map(({ comment, displayName }) => (
            <div key={`${displayName}${comment}`} className="Post__Comment">
                <Link to={`/profile/${displayName}`}>
                    <b className="Post__Comment--username">{displayName}</b>
                </Link>
                <span className="Post__Comment--commentBody">{comment}</span>
            </div>
        )) }
        { comments.length > 2 && <p className="Post__Comment--viewAll">View all {comments.length} comments</p> }
        <p className="Post__Comment--date">{formatDistanceToNow(dateCreated)} ago</p>
        </>
    );
};

export default PostComments;
