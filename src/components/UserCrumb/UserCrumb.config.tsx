import { AccountActibityInterface } from 'Screen/Home/Home.config';

export interface UserCrumbContainerInterface {
    username: string
    fullName: string
    accountActivityInfo: AccountActibityInterface
}

export interface UserCrumbComponentInterface {
    username: string
    fullName: string
    accountActivityInfo: AccountActibityInterface
}
