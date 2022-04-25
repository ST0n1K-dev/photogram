import { PostInterface } from 'Type/Post';

interface Comment {
    displayName: string
    comment: string
}

export interface PostContainerInterface {
    post: PostInterface
}

export interface PostComponentInterface {
    post: PostInterface
    isLiked: boolean
    likes: number
    comments: Array<Comment>
    handleLike: () => Promise<void>
}

export interface PostHeaderInterface {
    username: string
}

export interface PostImageInterface {
    src: string
    caption: string
}

export interface PostActionsInterface {
    likes: number
    isLiked: boolean
    handleLike: () => Promise<void>
}

export interface PostContentInterface {
    username: string
    caption: string
}

export interface PostCommentsInterface {
    comments: Array<Comment>
    dateCreated: number
    docId: string
}
