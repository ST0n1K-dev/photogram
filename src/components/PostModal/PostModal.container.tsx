import React, {
  useState, useEffect, useContext, useRef
} from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, likePost, commentPost } from 'Store/SelectedProfile';
import { useSnackbar } from 'notistack';

import { UserContext } from 'Context/user';
import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';
import { getDetailedPost } from 'Util/firebase';
import { PostInterface } from 'Type/Post';

import PostModalComponent from './PostModal.component';

import { PostModalContainerInterface } from './PostModal.config';

const PostModalContainer = (props: PostModalContainerInterface) => {
  const { isShowing, post, onClose } = props;
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const { uid: userId = '', displayName = '' } = user || {};
  const { firebase, FieldValue } = useContext(FirebaseContext) as FirebaseContextInterface;

  const { enqueueSnackbar } = useSnackbar();

  const { docId = '', photoId = 0 } = post as PostInterface || {};

  const commentInput = useRef<HTMLInputElement>(null);
  const [detailedPost, setDetailedPost] = useState<PostInterface | never[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes.length || 0);
  const [comments, setComments] = useState(post?.comments || []);

  useEffect(() => {
    async function getPostDetails() {
      setIsLoading(true);
      const receivedPost = await getDetailedPost(userId, photoId);

      setLikes(receivedPost.likes.length);
      setComments(receivedPost.comments);
      setIsLiked(receivedPost.isLiked);
      setDetailedPost(receivedPost);
      setIsLoading(false);
    }

    if (post && Object.keys(post).length > 0) {
      getPostDetails();
    }
  }, [post, photoId, userId]);

  const handleCommentFocus = () => {
    if (commentInput && commentInput.current) {
      commentInput.current.focus();
    }
  };

  const handleLike = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    try {
      await firebase.firestore().collection('posts')
        .doc(docId).update({
          likes: isLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
        });

      dispatch(likePost({ userId, docId, isLiked }));
      setLikes((prevLikes: number | undefined) => (isLiked ? prevLikes! - 1 : prevLikes! + 1));
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    }
  };

  const handleAddComment = (e: React.SyntheticEvent, comment: string) => {
    if (e) {
      e.preventDefault();
    }

    setComments([...comments, { displayName, comment }]);
    dispatch(commentPost({ displayName, comment, docId }));

    return firebase
      .firestore()
      .collection('posts')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  const handleDeletePost = () => {
    firebase
      .firestore()
      .collection('posts')
      .doc(docId)
      .delete();

    dispatch(deletePost({ docId }));

    onClose();
  };

  const containerProps = () => ({
    isShowing,
    post: detailedPost,
    isLiked,
    likes,
    comments,
    commentInput,
    isLoading,
    isMyPost: post?.userId === userId
  });

  const containerFunctions = {
    onClose,
    handleLike,
    handleAddComment,
    handleCommentFocus,
    handleDeletePost
  };

  return (
    <PostModalComponent
      {...containerProps()}
      {...containerFunctions}
    />
  );
};

export default PostModalContainer;
