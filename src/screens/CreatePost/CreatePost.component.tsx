import React from 'react';
import { Form, Formik } from 'formik';
import { Button, TextField } from '@mui/material';

import {
	CreatePostSchema,
	CreatePostComponentInterface,
} from './CreatePost.config';
import './CreatePost.style.scss';

const CreatePostComponent: React.FC<CreatePostComponentInterface> = (props) => {
	const {
		handleCreatePost, postPicture, caption, dispatch
	} = props;

	const getImageFromFile = (file: any): string => {
		if (typeof file === 'object') {
		  const url = URL.createObjectURL(file);

		  return url;
		}

		return file;
	};

	return (
		<div className="CreatePostPage">
			<Formik
				initialValues={{ postPicture, caption }}
				validationSchema={CreatePostSchema}
				onSubmit={(values) => {
					handleCreatePost(values);
				}}
			>
				{({
					values,
					handleBlur,
					handleChange,
					setFieldValue,
				}) => (
					<Form>
						<div className="CreatePostPage__Image">
							<label htmlFor="postPicture">
								<input
									id="postPicture"
									name="postPicture"
									type="file"
									onChange={(event) => {
										setFieldValue(
											'postPicture',
											event!.currentTarget!.files![0]
										);
										dispatch({ postPicture: event!.currentTarget!.files![0] });
									}}
								/>
								<figure className="CreatePostPage__PostFigure">
									<img
										src={postPicture ? getImageFromFile(postPicture) : '/images/post-placeholder.png'}
										className="CreatePostPage__PostPreview"
										alt="postPicture"
									/>
									<figcaption className="CreatePostPage__Figcaption">
										<img
											src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
											alt="hover"
										/>
									</figcaption>
								</figure>
							</label>
						</div>
            <TextField
              id="caption"
							name="caption"
              label="Post caption"
              className="CreatePostPage__Caption"
              multiline
              maxRows={10}
              value={values.caption}
              onChange={handleChange('caption')}
              onBlur={handleBlur('caption')}
            />
						<Button type="submit" variant="contained">
							Create post
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreatePostComponent;
