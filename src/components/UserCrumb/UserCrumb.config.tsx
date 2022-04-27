export interface UserCrumbContainerInterface {
    username: string
    fullName: string
    following: Array<string>
    followers: Array<string>
}

export interface UserCrumbComponentInterface {
    username: string
    fullName: string
    following: number
    followers: number
}
