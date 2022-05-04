import React from 'react';

import {
  Modal, Box, Divider, Skeleton
} from '@mui/material';
import { PostInterface } from 'Type/Post';
import PostHeader from 'Component/Post/Header';
import PostImage from 'Component/Post/Image';
import PostActions from 'Component/Post/Actions';
import PostContent from 'Component/Post/Content';
import Comments from './Comments';

import { PostModalComponentInterface } from './PostModal.config';

import './PostModal.style.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PostModalComponent = (props: PostModalComponentInterface) => {
  const {
    isShowing, onClose, post, likes, isLiked, comments = [],
    handleLike, handleAddComment, commentInput, isLoading
  } = props;

  if (!post) {
    return null;
  }

  const {
    username = '',
    imageSrc = '',
    caption = '',
    dateCreated,
    docId = ''
  } = post as PostInterface || {};

  return (
    <Modal open={isShowing} onClose={onClose} aria-labelledby="post-modal">
      <Box className="PostModal" sx={style}>
        <div className="PostModal__PostArea">
          <div className="Post">
            {isLoading ? <Skeleton variant="rectangular" width={100} height={40} /> : <PostHeader username={username} />}
            {isLoading ? <Skeleton variant="rectangular" width={450} height={500} /> : <PostImage src={imageSrc} caption={caption} />}
            {isLoading ? <Skeleton variant="rectangular" /> : (
              <PostActions
                likes={likes!}
                isLiked={isLiked!}
                handleLike={handleLike}
              />
            )}
          </div>
        </div>
        <div className="PostModal__DetailsArea">
          {isLoading ? <Skeleton variant="rectangular" width={450} height={600} /> : (
            <div className="Post">
              <PostContent username={username} caption={caption} />
              <Divider />
              <h3>Comments</h3>
              <Comments
                comments={comments}
                dateCreated={dateCreated}
                docId={docId}
                commentInput={commentInput}
                handleAddComment={handleAddComment}
              />
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default PostModalComponent;
