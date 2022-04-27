/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';
import { User } from 'Type/User';

const AUTH_USER = 'authUser';

export function useAuth() {
  const [user, setUser] = useState<User | null>(
      JSON.parse(localStorage.getItem(AUTH_USER) as string)
    ) || null;
  const { firebase } = useContext(FirebaseContext) as FirebaseContextInterface;

  useEffect(() => {
      const listener = firebase.auth().onAuthStateChanged((user: User) => {
          if (user) {
              localStorage.setItem(AUTH_USER, JSON.stringify(user));
              setUser(user);
          } else {
              localStorage.removeItem(AUTH_USER);
              setUser(null);
          }
      });

      return () => listener();
  }, [firebase]);

  return { user };
}
