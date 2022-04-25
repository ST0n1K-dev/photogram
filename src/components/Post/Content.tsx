import React from 'react';

import { PostContentInterface } from './Post.config';

const PostContent = ({ username, caption }: PostContentInterface) => (
    <div className="Post__Content">
        <b className="Post__Content--username">{username}</b>
        <span className="Post__Content--caption">{caption}</span>
    </div>
);

export default PostContent;
