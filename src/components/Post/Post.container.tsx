import React, { useContext, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';

import { PostInterface } from 'Type/Post';

import UserContext from 'Context/user';
import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';
import PostComponent from './Post.component';
import { PostContainerInterface } from './Post.config';

const PostContainer: React.FC<PostContainerInterface> = ({ post }) => {
  const { user } = useContext(UserContext);
  const { uid: userId = '', displayName = '' } = user || {};
  const { firebase, FieldValue } = useContext(FirebaseContext) as FirebaseContextInterface;

  const commentInput = useRef<HTMLInputElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const { docId } = post as PostInterface;

  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);

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

  const handleAddComment = (e: React.SyntheticEvent, comment: string) => {
    if (e) {
      e.preventDefault();
    }

    setComments([...comments, { displayName, comment }]);

    return firebase
      .firestore()
      .collection('posts')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  const handleCommentFocus = () => {
    if (commentInput && commentInput.current) {
      commentInput.current.focus();
    }
  };

  const containerProps = () => ({
    post,
    isLiked,
    likes,
    comments,
    commentInput
  });

  const containerFunctions = {
    handleLike,
    handleCommentFocus,
    handleAddComment
  };

  return (
    <PostComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default PostContainer;
