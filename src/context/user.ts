/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

export const UserContext = createContext<{ user: any | null }>({ user: null });

export default UserContext;
