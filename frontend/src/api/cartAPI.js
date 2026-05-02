import { apiFetch } from './apiFetch';

const BASE = process.env.REACT_APP_API_URL;

export const getCart = async () => {
    const res = await apiFetch(`${BASE}/cart`);
    return res.json();
};

export const addToCart = async (product_id, quantity = 1) => {
    const res = await apiFetch(`${BASE}/cart`, {
        method: 'POST',
        body: JSON.stringify({ product_id, quantity }),
    });
    return res.json();
};

export const updateCartItem = async (id, quantity) => {
    const res = await apiFetch(`${BASE}/cart/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
    });
    return res.json();
};

export const removeFromCart = async (id) => {
    const res = await apiFetch(`${BASE}/cart/${id}`, {
        method: 'DELETE',
    });
    return res.json();
};

export const clearCart = async () => {
    const res = await apiFetch(`${BASE}/cart`, {
        method: 'DELETE',
    });
    return res.json();
};

export const checkout = async (cash) => {
    const res = await apiFetch(`${BASE}/transactions`, {
        method: 'POST',
        body: JSON.stringify({ cash }),
    });
    return res.json();
};