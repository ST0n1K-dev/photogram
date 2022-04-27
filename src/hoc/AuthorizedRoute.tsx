/* eslint-disable react/require-default-props */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from 'Type/User';

interface AuthorizedRouteInterface {
    user: User | null,
    children: React.ReactChild,
    redirectURL: string
}

// eslint-disable-next-line no-undef
const AuthorizedRoute = (props: AuthorizedRouteInterface): JSX.Element => {
    const { user, children, redirectURL } = props;

    if (!user) {
        return children as React.ReactElement<any, any>;
    }

    return <Navigate to={redirectURL} replace />;
};

export default AuthorizedRoute;
