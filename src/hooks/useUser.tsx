import { useState, useEffect } from 'react';
import { User } from 'Type/User';
import { getUserById } from 'Util/firebase';
import { useAuth } from './useAuth';

export function useUser() {
  const [currentUser, setCurrentUser] = useState<User | object>({});
  const { user } = useAuth();

  useEffect(() => {
      async function getUser() {
          const [receivedUser] = await getUserById(user!.uid!);
          setCurrentUser(receivedUser);
      }

      if (user && user?.uid) {
        getUser();
      } else {
          setCurrentUser({});
      }
  }, [user, user?.uid]);

  return { user: currentUser };
}

export default useUser;
