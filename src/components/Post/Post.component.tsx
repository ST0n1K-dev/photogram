import React from 'react';
import { PostInterface } from 'Type/Post';

import PostHeader from './Header';
import PostImage from './Image';
import PostActions from './Actions';
import PostContent from './Content';
import PostComments from './Comments';
import { PostComponentInterface } from './Post.config';
import './Post.style.scss';

const PostComponent: React.FC<PostComponentInterface> = (props) => {
  const {
    post = {}, likes, handleLike, isLiked, comments
  } = props;

  const {
    username = '',
    imageSrc = '',
    caption = '',
    dateCreated,
    docId
  } = post as PostInterface;

  if (!post) {
    return null;
  }

  return (
    <div className="Post">
      <PostHeader username={username} />
      <PostImage src={imageSrc} caption={caption} />
      <PostActions likes={likes} isLiked={isLiked} handleLike={handleLike} />
      <PostContent username={username} caption={caption} />
      <PostComments comments={comments} dateCreated={dateCreated} docId={docId} />
    </div>
  );
};

export default PostComponent;
