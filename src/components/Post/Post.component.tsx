import React, { useState, useEffect } from 'react';
import { FullMetadata } from '@firebase/storage';
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
    post = {}, likes, handleLike, isLiked, handleEditPost,
    comments, handleCommentFocus, handleAddComment, commentInput
  } = props;
  const [postImage, setPostImage] = useState<string>('');
  const [postMeta, setPostMeta] = useState<FullMetadata | any>({});

  const {
    username = '',
    caption = '',
    category = '',
    dateCreated,
    docId
  } = post as PostInterface;

  useEffect(() => {
		async function setImage() {
			const { content, metadata } = await getPostImage(username, docId);

			setPostImage(content);
			setPostMeta(metadata);
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
      <PostImage src={postImage} caption={caption} metadata={postMeta} />
      <PostActions
        likes={likes}
        isLiked={isLiked}
        handleLike={handleLike}
        handleEditPost={handleEditPost}
        handleCommentFocus={handleCommentFocus}
      />
      <PostContent username={username} caption={caption} category={category} />
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
