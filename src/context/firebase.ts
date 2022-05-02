/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { FirebaseStorage } from '@firebase/storage';
import { createContext } from 'react';

export interface FirebaseContextInterface {
    firebase: any,
    analytics: any,
    FieldValue: any
    storage: FirebaseStorage
}

export const FirebaseContext = createContext<FirebaseContextInterface | null>(null);

export default FirebaseContext;
