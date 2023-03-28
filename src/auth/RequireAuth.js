import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../helpers/cookieHelper';


const RequireAuth = (props) => {
    const { children } = props;
    const location = useLocation();
    const isAuth = getCookie('__user-token');
    if (!isAuth) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;
