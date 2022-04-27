import usePosts from 'Hook/usePosts';
import React from 'react';

import PostsList from './PostsList.component';

const PostsListContainer: React.FC = () => {
  const { posts } = usePosts();

  const containerProps = () => ({
    posts
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
