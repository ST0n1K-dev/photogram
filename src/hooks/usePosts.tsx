import { useState, useContext, useEffect } from 'react';
import { User } from 'Type/User';
import { UserContext } from 'Context/user';
import { getPosts, getUserById } from 'Util/firebase';
import { PostInterface } from 'Type/Post';

export default function usePosts() {
  const [posts, setPosts] = useState<Array<PostInterface> | null>(null);
  const { user: { uid: userId = '' } } = useContext(UserContext) as { user: User };

  useEffect(() => {
    async function getDisplayedPosts() {
      const [{ following }] = await getUserById(userId) as any;
      let followingUsersPosts: Array<PostInterface> = [];

      if (following.length > 0) {
          followingUsersPosts = await getPosts(userId, following);
      }

      // sorting by date desc
      followingUsersPosts.sort((a, b) => b.dateCreated - a.dateCreated);
      setPosts(followingUsersPosts);
    }

    getDisplayedPosts();
  }, [userId]);

  return { posts };
}
