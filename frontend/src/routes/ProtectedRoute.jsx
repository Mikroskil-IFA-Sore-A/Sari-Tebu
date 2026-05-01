import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../utils/storage';

export default function ProtectedRoute() {
    return isLoggedIn() ? <Outlet /> : <Navigate to="/auth" replace />;
}