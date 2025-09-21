import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        return token !== null && token !== undefined && token.trim() !== '';
    };

    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;