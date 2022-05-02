import React from 'react';
import { User } from 'Type/User';

export interface SuggestedUsersInterface {
    currentUserId: string
    currentUserDocId: string
    following: Array<string>
    setFollowing: React.Dispatch<React.SetStateAction<string[]>>
}

export interface SuggestedUsersComponentInterface {
    profiles: Array<User>
    currentUserDocId: string
    currentUserId: string
    setFollowing: React.Dispatch<React.SetStateAction<string[]>>
}
