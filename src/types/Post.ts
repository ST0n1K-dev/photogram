export interface PostInterface {
    [x: string]: any
    photoId: number
    category: string
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
