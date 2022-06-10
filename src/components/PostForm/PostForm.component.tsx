import React from 'react';
import { Form, Formik } from 'formik';
import {
  Button, TextField, CircularProgress, Autocomplete
} from '@mui/material';

import { CreatePostSchema, PostFormComponentInterface, categoriesList } from './PostForm.config';

import './PostForm.style.scss';

const PostFormComponent:React.FC<PostFormComponentInterface> = (props) => {
  const {
    postPicture, caption, postCategory, isLoading, handleSubmit, handlePictureSet
  } = props;

  const getImageFromFile = (file: any): string => {
		if (typeof file === 'object') {
		  const url = URL.createObjectURL(file);

		  return url;
		}

		return file;
	};

  return (
    <>
    <Formik
    initialValues={{ postPicture, caption, postCategory }}
    validationSchema={CreatePostSchema}
    onSubmit={(values) => {
      handleSubmit(values);
    }}
    >
    {({
      errors,
      touched,
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

              { postPicture && (postPicture as any)?.type.includes('video') ? (
                <video width="100%" height="100%" controls muted>
                    <source src={getImageFromFile(postPicture)} type="video/mp4" />
                </video>
                ) : (
                <img
                  src={postPicture ? getImageFromFile(postPicture) : '/images/post-placeholder.png'}
                  className="PostForm__PostPreview"
                  alt="postPicture"
                />
                )}
              <figcaption className="PostForm__Figcaption">
                <img
                  src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                  alt="hover"
                />
              </figcaption>
            </figure>
          </label>
          { (errors.postPicture && touched.postPicture) ? <p style={{ color: 'red' }}>{errors.postPicture}</p> : null }
        </div>
        <TextField
          id="caption"
          name="caption"
          label="Опис публікації"
          className="PostForm__Caption"
          multiline
          maxRows={10}
          value={values.caption}
          onChange={handleChange('caption')}
          onBlur={handleBlur('caption')}
        />
        { (errors.caption && touched.caption) ? <p style={{ color: 'red' }}>{errors.caption}</p> : null }
        <Autocomplete
          disablePortal
          value={values.postCategory}
          onChange={(event: any, newValue: string | null) => {
            setFieldValue(
              'postCategory',
              newValue
            );
          }}
          onBlur={handleBlur('postCategory')}
          id="post-category"
          options={categoriesList}
          sx={{ width: 300, margin: '20px auto' }}
          renderInput={(params) => <TextField {...params} label="Категорія" />}
        />

        <Button type="submit" variant="contained" disabled={isLoading}>
          Створити публікацію
        </Button>
      </Form>
    )}
    </Formik>
    { isLoading && <CircularProgress /> }
    </>
    );
};

export default PostFormComponent;
