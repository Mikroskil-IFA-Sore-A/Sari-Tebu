import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import CreateUser from "./pages/Users/CreateUser";
import Products from "./pages/Products/Products";
import CreateProduct from "./pages/Products/CreateProduct";
import Cart from "./pages/cart/Cart";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { isLoggedIn } from './utils/storage';

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route 
                path="/auth"
                element={isLoggedIn() ? <Navigate to="/" replace /> : <Auth />}
            />

            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/create" element={<CreateUser />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/create" element={<CreateProduct />} />
                    <Route path="/carts" element={<Cart />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;