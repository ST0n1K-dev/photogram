import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

import { useUserAvatar } from 'Hook/useUserAvatar';

import { PostHeaderInterface } from './Post.config';

const PostHeader = ({ username }: PostHeaderInterface) => {
    const { avatar } = useUserAvatar(username);

    return (
        <Link to={`/profile/${username}`}>
            <div className="Post__Header">
                <Avatar alt="User avatar" src={avatar || '/images/avatar.png'} />
                <div className="Post__Header--user">
                    <span className="Post__Header--username">{ username }</span>
                    <span className="Post__Header--location">Zhytomyr</span>
                </div>
            </div>
        </Link>
      );
};

export default PostHeader;
