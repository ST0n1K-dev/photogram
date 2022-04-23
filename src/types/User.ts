export interface User {
    dateCreated: Date
    docId: string
    uid?: string
    emailAddress: string
    followers: Array<string>
    following: Array<string>
    fullName: string
    userId: string
    username: string
}
