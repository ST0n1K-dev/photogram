/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';

const AUTH_USER = 'authUser';

export const useAuth = () => {
  const [user, setUser] = useState<string | null>(
      JSON.parse(localStorage.getItem(AUTH_USER) as string)
    ) || null;
  const { firebase } = useContext(FirebaseContext) as FirebaseContextInterface;

  useEffect(() => {
      const listener = firebase.auth().onAuthStateChanged((user?: string) => {
          if (user) {
              localStorage.setItem(AUTH_USER, JSON.stringify(user));
              setUser(user);
          } else {
              localStorage.removeItem(AUTH_USER);
              setUser(null);
          }
      });

      return () => listener;
  }, [firebase]);

  return { user };
};
