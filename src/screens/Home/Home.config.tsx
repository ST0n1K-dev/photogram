import { User } from 'Type/User';

export interface HomeProps {
    user: User,
    accountActivityInfo: AccountActibityInterface
}

export interface AccountActibityInterface {
    followers: number
	following: number
}
