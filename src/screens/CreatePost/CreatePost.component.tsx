import React from 'react';

import PostForm from 'Component/PostForm';
import { CreatePostComponentInterface } from './CreatePost.config';
import './CreatePost.style.scss';

const CreatePostComponent: React.FC<CreatePostComponentInterface> = (props) => {
	const {
		handleCreatePost, postPicture, postCategory, caption, dispatch, isLoading
	} = props;

	const setPicture = (file: File) => {
		dispatch({ postPicture: file });
	};

	return (
		<div className="CreatePostPage">
			<PostForm
				postPicture={postPicture}
				postCategory={postCategory!}
				caption={caption!}
				isLoading={isLoading!}
				handleSubmit={handleCreatePost}
				handlePictureSet={setPicture}
			/>
		</div>
	);
};

export default CreatePostComponent;
