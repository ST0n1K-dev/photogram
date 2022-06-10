import React from 'react';

import { PostFormContainerInterface } from './PostForm.config';
import PostFormComponent from './PostForm.component';

const PostFormContainer = (props: PostFormContainerInterface) => {
  const {
    postPicture, caption, postCategory, isLoading, handlePictureSet, handleSubmit
  } = props;

  const containerProps = () => ({
    postPicture,
    isLoading,
    caption,
    postCategory
  });

  const containerFunctions = {
    handlePictureSet,
    handleSubmit
  };

  return (
    <PostFormComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default PostFormContainer;
