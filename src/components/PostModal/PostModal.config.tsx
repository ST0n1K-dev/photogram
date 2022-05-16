import React from 'react';
import { PostInterface } from 'Type/Post';

export interface PostModalContainerInterface {
    isShowing: boolean
    post?: PostInterface
    onClose: () => void
}

interface Comment {
    displayName: string
    comment: string
}

export interface PostModalComponentInterface {
    isShowing: boolean
    isMyPost: boolean
    isLoading: boolean
    post?: PostInterface | never[]
    onClose: () => void,
    isLiked?: boolean
    likes?: number
    comments?: Array<Comment>
    handleLike: () => Promise<void>
    handleAddComment: (e: React.SyntheticEvent, comment: string) => void
    handleCommentFocus?: () => void
    handleDeletePost: () => void
    commentInput: React.RefObject<HTMLInputElement>
}

export interface PostModalCommentsInterface {
    comments: Array<Comment>
    dateCreated: number
    docId: string
    handleAddComment: (e: React.SyntheticEvent, comment: string) => void
    commentInput: React.RefObject<HTMLInputElement>
}
