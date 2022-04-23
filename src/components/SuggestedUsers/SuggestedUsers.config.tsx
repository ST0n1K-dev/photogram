import { User } from 'Type/User';

export interface SuggestedUsersInterface {
    userId: string,
    following: Array<string>
}

export interface SuggestedUsersComponentInterface {
    profiles: Array<User>
}
