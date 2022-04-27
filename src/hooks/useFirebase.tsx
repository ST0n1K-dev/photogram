import { useState, useEffect, useContext } from 'react';
import { FirebaseContext, FirebaseContextInterface } from 'Context/firebase';

export function useFirebase() {
  const [receivedFirebase, setReceivedFirebase] = useState<FirebaseContextInterface | null>(null);
  const { firebase } = useContext(FirebaseContext) as FirebaseContextInterface;

  useEffect(() => {
      if (firebase) {
          setReceivedFirebase(firebase);
      }
  }, [firebase]);

  return { firebase: receivedFirebase };
}

export default useFirebase;
