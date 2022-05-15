import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, setUserPosts } from 'Store/MyAccount';
import { User } from 'Type/User';
import { getUserById, getUserAvatar, getUserPosts } from 'Util/firebase';
import { RootState } from '../redux/store';
import { useAuth } from './useAuth';

export function useUser() {
  // const [currentUser, setCurrentUser] = useState<User | object>({});
  const currentUser = useSelector((state: RootState) => state.MyAccount.user);
  const dispatch = useDispatch();

  const { user } = useAuth();

  useEffect(() => {
      async function getUser() {
          const [receivedUser] = await getUserById(user!.uid!);
          const receivedPosts = await getUserPosts(receivedUser as User);
          const receivedAvatar = await getUserAvatar(user!.displayName!);
          // setCurrentUser(receivedUser || {});
          dispatch(setUser({ ...receivedUser, avatar: receivedAvatar }));
          dispatch(setUserPosts(receivedPosts));
      }

      if (user && user?.uid) {
        getUser();
      } else {
          // setCurrentUser({});
          setUser({});
      }
  }, [user, user?.uid, dispatch]);

  return { user: currentUser };
}

export default useUser;
