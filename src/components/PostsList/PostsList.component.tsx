import React from 'react';
import Post from 'Component/Post';
import { PostsListTypes } from './PostsList.config';

export const PostsListComponent: React.FC<PostsListTypes> = (props): any => {
  const { posts } = props;

  return posts?.map((post) => <Post key={post.docId} post={post} />);
};

export default PostsListComponent;
