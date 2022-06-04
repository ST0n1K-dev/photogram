/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { PostImageInterface } from './Post.config';

const PostImage = ({ src, caption, metadata }: PostImageInterface) => {
    const { contentType = '' } = metadata;

    if (contentType.includes('video')) {
        return (
            <video className="Post__Image" width="100%" height="100%" controls muted>
                  <source src={src} type="video/mp4" />
            </video>
        );
    }

    return (
        <img className="Post__Image" src={src} alt={caption} />
    );
};

export default PostImage;
