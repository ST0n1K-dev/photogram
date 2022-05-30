import React, { useState, useEffect } from 'react';
import { PostInterface } from 'Type/Post';
import { getPostImage } from 'Util/firebase';

import PostHeader from './Header';
import PostImage from './Image';
import PostActions from './Actions';
import PostContent from './Content';
import PostComments from './Comments';
import { PostComponentInterface } from './Post.config';
import './Post.style.scss';

const PostComponent: React.FC<PostComponentInterface> = (props) => {
  const {
    post = {}, likes, handleLike, isLiked,
    comments, handleCommentFocus, handleAddComment, commentInput
  } = props;
  const [postImage, setPostImage] = useState<string>('');

  const {
    username = '',
    caption = '',
    dateCreated,
    docId
  } = post as PostInterface;

  useEffect(() => {
		async function setImage() {
			const image = await getPostImage(username, docId);

			setPostImage(image);
		}

		if (username && post) {
			setImage();
		}
	}, [post, username, docId]);

  if (!post) {
    return null;
  }

  return (
    <div className="Post">
      <PostHeader username={username} />
      <PostImage src={postImage} caption={caption} />
      <PostActions
        likes={likes}
        isLiked={isLiked}
        handleLike={handleLike}
        handleCommentFocus={handleCommentFocus}
      />
      <PostContent username={username} caption={caption} />
      <PostComments
        comments={comments}
        post={post as PostInterface}
        dateCreated={dateCreated}
        docId={docId}
        handleAddComment={handleAddComment}
        commentInput={commentInput}
      />
    </div>
  );
};

export default PostComponent;
