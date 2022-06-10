/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';

import { PostsCategoriesInterface } from './Profile.config';

const PostsCategories: React.FC<PostsCategoriesInterface> = (props) => {
    const { posts, handleCategorySelect, activeCategory } = props;

    const [categories, setCategories] = useState<Array<string>>([]);

    useEffect(() => {
        (function getCategories() {
            if (posts?.length) {
                // eslint-disable-next-line max-len
                const uniqueCategories = Array.from(new Set(posts.map((post) => post.category))).filter((category) => category !== undefined);

                setCategories(uniqueCategories);
            }
        }());
    }, [posts]);

    if (!categories.length) {
        return null;
    }

    return (
        <div className="Profile__PostCategories">
            <div
                key="all"
                onClick={() => handleCategorySelect('')}
                className={`Profile__PostCategories--category ${activeCategory === '' && 'active'}`}
            >
                <p>Усі публікації</p>
            </div>
            { categories.map((category) => (
                <div
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`Profile__PostCategories--category ${category === activeCategory && 'active'}`}
                >
                    <p>{category}</p>
                </div>
            ))}
        </div>
    );
};

export default PostsCategories;
