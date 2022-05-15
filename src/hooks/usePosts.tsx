import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from 'Type/User';
import { setFollowingPosts } from 'Store/MyAccount';
import { getPosts, getUserById } from 'Util/firebase';
import { PostInterface } from 'Type/Post';

import { RootState } from '../redux/store';

export default function usePosts() {
  // const [posts, setPosts] = useState<Array<PostInterface> | null>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.MyAccount.user) as User;
  const followingPosts = useSelector((state: RootState) => state.MyAccount.followingPosts);

  const { userId = '' } = user || {};

  useEffect(() => {
    async function getDisplayedPosts() {
      const [{ following = [] } = {}] = await getUserById(userId) as any;
      let followingUsersPosts: Array<PostInterface> = [];

      if (following.length > 0) {
          followingUsersPosts = await getPosts(userId, following);
      }

      // sorting by date desc
      followingUsersPosts.sort((a, b) => b.dateCreated - a.dateCreated);
      dispatch(setFollowingPosts(followingUsersPosts));
    }

    if (userId) {
      getDisplayedPosts();
    }
  }, [userId, user.following, dispatch]);

  return { followingPosts };
}
