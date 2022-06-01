import React from 'react';
import { Form, Formik } from 'formik';
import { Button, TextField } from '@mui/material';

import { CreatePostSchema, PostFormComponentInterface } from './PostForm.config';

import './PostForm.style.scss';

const PostFormComponent:React.FC<PostFormComponentInterface> = (props) => {
  const {
    postPicture, caption, handleSubmit, handlePictureSet
  } = props;

  const getImageFromFile = (file: any): string => {
		if (typeof file === 'object') {
		  const url = URL.createObjectURL(file);

		  return url;
		}

		return file;
	};

  return (
    <Formik
    initialValues={{ postPicture, caption }}
    validationSchema={CreatePostSchema}
    onSubmit={(values) => {
      handleSubmit(values);
    }}
    >
    {({
      values,
      handleBlur,
      handleChange,
      setFieldValue,
    }) => (
      <Form>
        <div className="PostForm__Image">
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
                handlePictureSet(event!.currentTarget!.files![0]);
              }}
            />
            <figure className="PostForm__PostFigure">
              <img
                src={postPicture ? getImageFromFile(postPicture) : '/images/post-placeholder.png'}
                className="PostForm__PostPreview"
                alt="postPicture"
              />
              <figcaption className="PostForm__Figcaption">
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
          className="PostForm__Caption"
          multiline
          maxRows={10}
          value={values.caption}
          onChange={handleChange('caption')}
          onBlur={handleBlur('caption')}
        />
        <Button type="submit" variant="contained">
          Створити пост
        </Button>
      </Form>
    )}
    </Formik>
    );
};

export default PostFormComponent;
