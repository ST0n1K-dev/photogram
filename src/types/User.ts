export interface User {
	displayName?: string
    dateCreated: Date
    docId: string
    uid?: string
    emailAddress: string
    followers: Array<string>
    following: Array<string>
    fullName: string
    userId: string
    username: string,
    profileId: string
    description?: string
}
