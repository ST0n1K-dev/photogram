import React from 'react';

import { PostFormContainerInterface } from './PostForm.config';
import PostFormComponent from './PostForm.component';

const PostFormContainer = (props: PostFormContainerInterface) => {
  const {
    postPicture, caption, isLoading, handlePictureSet, handleSubmit
  } = props;

  const containerProps = () => ({
    postPicture,
    isLoading,
    caption
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
