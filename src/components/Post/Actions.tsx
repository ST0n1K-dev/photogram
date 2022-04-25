import React from 'react';
import { IconButton } from '@mui/material';

import {
    FavoriteBorder as FavoriteBorderIcon,
    Favorite as FavoriteIcon,
    ChatBubbleOutline as ChatBubbleOutlineIcon
} from '@mui/icons-material';

import { PostActionsInterface } from './Post.config';

const PostActions = ({ likes, isLiked, handleLike }: PostActionsInterface) => (
    <div className="Post__Actions">
        <div className="Post__Actions--buttons">
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleLike}
            >
                { isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
            </IconButton>
            <IconButton>
                <ChatBubbleOutlineIcon />
            </IconButton>
        </div>
        <span className="Post__Actions--likes">{likes} likes</span>
    </div>
  );

export default PostActions;
