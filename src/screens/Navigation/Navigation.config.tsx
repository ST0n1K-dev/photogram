import React from 'react';
import { User } from 'Type/User';

export type NavigationProps = {
    children?: React.ReactNode,
    user: User | null
}
