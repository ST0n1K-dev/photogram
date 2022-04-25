import { PostInterface } from 'Type/Post';

export interface PostContainerInterface {
    post: PostInterface
}

export interface PostComponentInterface {
    post: PostInterface
    isLiked: boolean
    likes: number
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
