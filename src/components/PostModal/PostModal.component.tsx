import React, { useState, useEffect } from 'react';

import {
  Modal, Box, Divider, Skeleton
} from '@mui/material';

import { getPostImage } from 'Util/firebase';

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
    handleLike, handleAddComment, commentInput, isLoading, isMyPost,
    handleDeletePost, handleEditPostClick, exitPostEditMode, updatePostCaption
  } = props;
  const [postImage, setPostImage] = useState<string>('');

  const {
    username = '',
    caption = '',
    dateCreated,
    docId = ''
  } = post as PostInterface || {};

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
    <Modal open={isShowing} onClose={onClose} aria-labelledby="post-modal">
      <Box className="PostModal" sx={style}>
        <div className="PostModal__PostArea">
          <div className="Post">
            {isLoading ? <Skeleton variant="rectangular" width={100} height={40} /> : <PostHeader username={username} />}
            {isLoading ? <Skeleton variant="rectangular" width={450} height={500} /> : <PostImage src={postImage} caption={caption} />}
            {isLoading ? <Skeleton variant="rectangular" /> : (
              <PostActions
                editAvailable={isMyPost}
                deleteAvailable={isMyPost}
                likes={likes!}
                isLiked={isLiked!}
                handleLike={handleLike}
                handleEditPostClick={handleEditPostClick}
                handleDeletePost={handleDeletePost}
                isModal
              />
            )}
          </div>
        </div>
        <div className="PostModal__DetailsArea">
          {isLoading ? <Skeleton variant="rectangular" width={450} height={600} /> : (
            <div className="Post">
              <div>
                <PostContent
                  username={username}
                  caption={caption}
                  exitPostEditMode={exitPostEditMode}
                  updatePostCaption={updatePostCaption}
                />
                <Divider />
                <h3>Коментарі</h3>
              </div>
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
