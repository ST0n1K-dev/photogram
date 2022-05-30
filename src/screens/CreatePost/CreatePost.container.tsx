/* eslint-disable @typescript-eslint/no-shadow */
import React, { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes } from 'firebase/storage';
import { useSnackbar } from 'notistack';

import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';

import useUser from 'Hook/useUser';
import { User } from 'Type/User';
import { createPost } from 'Util/firebase';
import { CreatePostForm } from './CreatePost.config';
import CreatePostComponent from './CreatePost.component';

const CreatePostContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUser();
  const navigate = useNavigate();

  const { userId = '', username = '' } = user as User || {};
  const reducer = (state: CreatePostForm, newState: CreatePostForm) => ({
    ...state, ...newState
  });

  const initialState = {
    postPicture: '',
    caption: '',
  };

  const [{ postPicture, caption }, dispatch] = useReducer(reducer, initialState);

  const { storage } = useContext(FirebaseContext) as FirebaseContextInterface;

  const uploadPostPicture = async (picture: any, postId: string) => {
    if (picture === null) return;

    const imageRef = ref(storage, `posts/${username}/${postId}`);
    await uploadBytes(imageRef, picture);
  };

  const handleCreatePost = async (values: CreatePostForm) => {
    try {
      const { postPicture, caption } = values;

      const postId = await createPost(userId, caption!);

      if (postPicture) {
        await uploadPostPicture(postPicture!, postId);
      }

      enqueueSnackbar('Your post is being created', { variant: 'success' });

      navigate(`/profile/${username}`);
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    }
  };

  const containerProps = () => ({
    postPicture,
    caption
  });

  const containerFunctions = {
    handleCreatePost,
    dispatch
  };

  return (
    <CreatePostComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default CreatePostContainer;
