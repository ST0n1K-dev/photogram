/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Skeleton, Button } from '@mui/material';
import { Comment, Favorite, PhotoCamera } from '@mui/icons-material';

import { getPostImage } from 'Util/firebase';
import PostModal from 'Component/PostModal';
import { PostInterface } from 'Type/Post';
import { User } from 'Type/User';
import useModal from 'Hook/useModal';

import { UserPostsInterface, PostContentInterface } from './Profile.config';

const PostHover = (props: { post: PostInterface }) => {
  const { post: { likes = [], comments = [] } } = props;

  return (
    <div className="Profile__UserPost--hover">
      <span><Favorite /> {likes.length}</span>
      <span><Comment /> {comments.length}</span>
    </div>
  );
};

const PostContent = (props: PostContentInterface) => {
	const { post, onPostClick, username } = props;
	const [postImage, setPostImage] = useState<string>('');

	useEffect(() => {
		async function setImage() {
			const image = await getPostImage(username, post.docId);

			setPostImage(image);
		}

		if (username && post) {
			setImage();
		}
	}, [post, username]);

	return (
		<Button key={post.docId} type="button" onClick={() => onPostClick(post)}>
			<div className="Profile__UserPost">
				{postImage && <img src={postImage} alt={post.caption} />}
				<div className="Profile__UserPost--hidden">
					<PostHover post={post} />
				</div>
			</div>
		</Button>
	  );
};

const UserPosts = ({ posts, profile }: UserPostsInterface) => {
	const { isShowing, toggle } = useModal();
	const [activePost, setActivePost] = useState<PostInterface | undefined>(undefined);
	const { username = '' } = profile as User || {};

	const onPostClick = (post: PostInterface) => {
		setActivePost(post);
		toggle();
	};

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
					<PostContent
						key={post.photoId}
						post={post}
						username={username}
						onPostClick={onPostClick}
					/>
				))
				: Array(9).map((_, i) => (
					<Skeleton
						key={i}
						variant="rectangular"
						width={300}
						height={400}
					/>
				))}

			{activePost && <PostModal isShowing={isShowing} post={activePost} onClose={toggle} /> }
		</div>
	);
};

export default UserPosts;
