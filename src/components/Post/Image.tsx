import React from 'react';
import { PostImageInterface } from './Post.config';

const PostImage = ({ src, caption }: PostImageInterface) => (
    <img className="Post__Image" src={src} alt={caption} />
);

export default PostImage;
