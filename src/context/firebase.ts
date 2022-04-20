/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

interface FirebaseContextInterface {
    firebase: any,
    analytics: any,
    FieldValue: any
}

export const FirebaseContext = createContext<FirebaseContextInterface | null>(null);

export default FirebaseContext;
