import React from 'react';
import { User } from 'Type/User';

export interface HomeProps {
    user: User
    following: Array<string>
    setFollowing: React.Dispatch<React.SetStateAction<string[]>>
}

export interface AccountActibityInterface {
    followers: number
	following: number
}
