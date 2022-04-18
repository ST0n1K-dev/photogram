import React from 'react';

import PostsList from './PostsList.component';

const PostsListContainer: React.FC = () => {
  const containerProps = () => ({
    test: 'asd',
  });

  const containerFunctions = {};

  return (
    <PostsList
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default PostsListContainer;
