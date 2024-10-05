// import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import {isTokenValid} from './utils'

const AuthCheck = ({ children }) => {
    const location = useLocation();
    const validToken = isTokenValid();
    // const token = localStorage.getItem('token');

    if (location.pathname === '/signup' || location.pathname === '/login') {
        return children;
    }

    if (!validToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthCheck;