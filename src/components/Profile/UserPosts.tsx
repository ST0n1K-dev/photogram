/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Skeleton } from '@mui/material';
import { Comment, Favorite, PhotoCamera } from '@mui/icons-material';
import { PostInterface } from 'Type/Post';

import { UserPostsInterface } from './Profile.config';

const PostHover = (props: { post: PostInterface }) => {
  const { post: { likes = [], comments = [] } } = props;

  return (
    <div className="Profile__UserPost--hover">
      <span><Favorite /> {likes.length}</span>
      <span><Comment /> {comments.length}</span>
    </div>
  );
};

const UserPosts = ({ posts }: UserPostsInterface) => {
	if (!posts || posts?.length < 1) {
		return (
      <div className="Profile__UserPosts--noPosts">
        <PhotoCamera />
        <h3>No posts there yet</h3>
      </div>
    );
	}

	return (
		<div className="Profile__UserPosts">
			{posts?.length
				? posts.map((post) => (
						<div key={post.docId} className="Profile__UserPost">
							<img src={post.imageSrc} alt={post.caption} />
							<div className="Profile__UserPost--hidden">
								<PostHover post={post} />
							</div>
						</div>
				  ))
				: Array(9).map((_, i) => (
						<Skeleton
							key={i}
							variant="rectangular"
							width={300}
							height={400}
						/>
				  ))}
		</div>
	);
};

export default UserPosts;
