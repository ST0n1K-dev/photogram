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
}

export interface UserHeroInterface {
    profile?: User | null | object
    postsTotal?: number
    totalFollowers?: number
    dispath: React.Dispatch<ReducerStateInterface>
}
