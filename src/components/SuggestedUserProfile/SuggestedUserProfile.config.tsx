import React from 'react';

export interface SuggestedUserProfileContainerInterface {
    username: string
    currentUserDocId: string
    fullName: string
    suggestedUserDocId: string
    suggestedUserId: string
    currentUserId: string
}

export interface SuggestedUserProfileComponentInterface {
    username: string
    fullName: string
    isFollowed: boolean
    followUser: (e: React.SyntheticEvent) => void
}
