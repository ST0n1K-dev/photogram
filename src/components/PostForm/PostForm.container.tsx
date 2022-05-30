import React from 'react';

import { PostFormContainerInterface } from './PostForm.config';
import PostFormComponent from './PostForm.component';

const PostFormContainer = (props: PostFormContainerInterface) => {
  const {
    postPicture, caption, handlePictureSet, handleSubmit
  } = props;

  const containerProps = () => ({
    postPicture,
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
