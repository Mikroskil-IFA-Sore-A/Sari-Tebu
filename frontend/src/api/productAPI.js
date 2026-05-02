import { apiFetch } from './apiFetch';

const BASE = process.env.REACT_APP_API_URL;

export const getProducts = async () => {
    const res = await apiFetch(`${BASE}/products`);
    return res.json();
};

export const createProduct = async (data) => {
    const res = await apiFetch(`${BASE}/products`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updateProduct = async (id, data) => {
    const res = await apiFetch(`${BASE}/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteProduct = async (id) => {
    const res = await apiFetch(`${BASE}/products/${id}`, {
        method: 'DELETE',
    });
    return res.json();
};

export const getProductById = async (id) => {
    const res = await apiFetch(`${BASE}/products/${id}`);
    return res.json();
};