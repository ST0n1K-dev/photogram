/* eslint-disable react/require-default-props */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as ROUTES from 'Type/routes';
import { User } from 'Type/User';

interface ProtectedRouteInterface {
    user: User | null,
    children?: React.ReactChild | null
}

// eslint-disable-next-line no-undef
const ProtectedRoute = (props: ProtectedRouteInterface): JSX.Element => {
    const { user, children } = props;

    if (!user || Object.keys(user).length < 1) {
        return <Navigate to={ROUTES.SIGNIN} replace />;
    }

    return children ? children as React.ReactElement<any, any> : <Outlet />;
};

export default ProtectedRoute;
