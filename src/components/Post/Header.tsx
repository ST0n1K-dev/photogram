import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

import { PostHeaderInterface } from './Post.config';

const PostHeader = ({ username }: PostHeaderInterface) => (
    <Link to={`/profile/${username}`}>
        <div className="Post__Header">
            <Avatar alt="Remy Sharp" src="/images/avatar.png" />
            <div className="Post__Header--user">
                <span className="Post__Header--username">{ username }</span>
                <span className="Post__Header--location">Zhytomyr</span>
            </div>
        </div>
    </Link>
  );

export default PostHeader;
