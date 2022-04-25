import React, { useContext, useState } from 'react';
import { useSnackbar } from 'notistack';

import { PostInterface } from 'Type/Post';

import UserContext from 'Context/user';
import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';
import PostComponent from './Post.component';
import { PostContainerInterface } from './Post.config';

const PostContainer: React.FC<PostContainerInterface> = ({ post }) => {
  const { user: { uid: userId = '' } } = useContext(UserContext);
  const { firebase, FieldValue } = useContext(FirebaseContext) as FirebaseContextInterface;

  const { enqueueSnackbar } = useSnackbar();

  const { docId } = post as PostInterface;

  // const commentInput = useRef(null);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes.length);

  const handleLike = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    try {
      await firebase.firestore().collection('posts')
        .doc(docId).update({
          likes: isLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
        });

      setLikes((prevLikes: number) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    }
  };

  // handleCommentFocus = () => commentInput.current!.focus();

  const containerProps = () => ({
    post,
    isLiked,
    likes
  });

  const containerFunctions = {
    handleLike
  };

  return (
    <PostComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default PostContainer;
