import usePosts from 'Hook/usePosts';
import React from 'react';

import PostsList from './PostsList.component';

const PostsListContainer: React.FC = () => {
  const { followingPosts } = usePosts();

  const containerProps = () => ({
    posts: followingPosts
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
