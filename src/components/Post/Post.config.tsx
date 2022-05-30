import React from 'react';
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
    handleCommentFocus: () => void
    handleEditPost?: () => void
    handleAddComment: (e: React.SyntheticEvent, comment: string) => void
    commentInput: React.RefObject<HTMLInputElement>
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
    isModal?: boolean
    editAvailable?: boolean
    deleteAvailable?: boolean
    isLiked: boolean
    isEditPostMode?: boolean
    handleCommentFocus?: () => void
    handleLike: () => Promise<void>
    handleEditPost?: () => void
    handleExitEditPostMode?: () => void
    handleEditPostClick?: () => void
    handleDeletePost?: () => void
}

export interface PostContentInterface {
    username: string
    caption: string,
    updatePostCaption?: (caption: string) => void
    exitPostEditMode?: () => void
}

export interface PostCommentsInterface {
    comments: Array<Comment>
    post: PostInterface
    dateCreated: number
    docId: string
    handleAddComment: (e: React.SyntheticEvent, comment: string) => void
    commentInput: React.RefObject<HTMLInputElement>
}

export interface AddCommentInterface {
    docId: string
    comments: Array<Comment>
    addComment: (e: React.SyntheticEvent, comment: string) => void
    commentInput: React.RefObject<HTMLInputElement>
}
