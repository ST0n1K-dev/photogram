export interface PostInterface {
    photoId: number
    isLiked: boolean
    docId: string
    userId: string
    imageSrc: string
    caption: string
    likes: Array<string>
    comments: Array<{
        displayName: string
        comment: string
    }>
    userLatitude: string
    userLongitude: string
    username: string
    dateCreated: number
}
