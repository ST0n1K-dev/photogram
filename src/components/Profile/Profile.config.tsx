import React from 'react';
import { PostInterface } from 'Type/Post';
import { User } from 'Type/User';

export interface ProfileContainerInterface {
    user: User | null
}

export interface ProfileComponentInterface extends ReducerStateInterface {
    dispatch: React.Dispatch<ReducerStateInterface>
}

export interface ReducerStateInterface {
    profile?: User | null | object
    posts?: Array<PostInterface> | Array<never>
    totalFollowers?: number
    followersPopupOpen?: boolean
    followingPopupOpen?: boolean
    followers?: Array<string> | []
    following?: Array<string> | []
    fullName?: string
    description?: string
    avatar?: any
}

export interface UserHeroInterface {
    profile?: User | null | object
    postsTotal?: number
    totalFollowers?: number
    followersPopupOpen?: boolean
    followingPopupOpen?: boolean
    followers?: Array<string> | []
    following?: Array<string> | []
    fullName?: string
    description?: string
    avatar?: any
    dispatch: React.Dispatch<ReducerStateInterface>
}

export interface UserPostsInterface {
    posts?: Array<PostInterface> | Array<never>
    profile?: User | null | object
}

export type FollowersModalType = 'followers' | 'following';

export interface FollowersModalInterface {
    isOpen: boolean
    followers: Array<string> | []
    onClose: () => void
    type: FollowersModalType
}

export interface UserProfileInterface {
    fullName: string
    username: string
    userId: string
    docId: string
    avatar?: string
}

export interface PostContentInterface {
    post: PostInterface
    onPostClick: (post: PostInterface) => void
    username: string
}
