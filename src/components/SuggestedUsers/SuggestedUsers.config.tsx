import { User } from 'Type/User';

export interface SuggestedUsersInterface {
    currentUserId: string
    currentUserDocId: string
    following: Array<string>
}

export interface SuggestedUsersComponentInterface {
    profiles: Array<User>
    currentUserDocId: string
    currentUserId: string
}
