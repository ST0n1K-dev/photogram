export interface User {
    dateCreated: Date
    docId: string
    uid?: string
    emailAddress: string
    followers: Array<User>
    following: Array<User>
    fullName: string
    userId: string
    username: string
}
