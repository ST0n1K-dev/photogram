import React from 'react';
import { Link } from 'react-router-dom';

import AddComment from 'Component/Post/AddComment';

import { PostModalCommentsInterface } from './PostModal.config';

const Comments = (props: PostModalCommentsInterface) => {
    const {
        comments, docId, handleAddComment, commentInput
    } = props;
    return (
        <div className="PostModal__Comments">
            <div className="PostModal__CommentList">
                { comments.map(({ comment, displayName }) => (
                    <div key={`${displayName}${comment}`} className="Post__Comment">
                        <Link to={`/profile/${displayName}`}>
                            <b className="Post__Comment--username">{displayName}</b>
                        </Link>
                        <span className="Post__Comment--commentBody">{comment}</span>
                    </div>
                )) }
            </div>
            <AddComment
                docId={docId}
                comments={comments}
                addComment={handleAddComment}
                commentInput={commentInput}
            />
        </div>
    );
};

export default Comments;
