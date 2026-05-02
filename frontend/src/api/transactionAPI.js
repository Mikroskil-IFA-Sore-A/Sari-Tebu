import { apiFetch } from './apiFetch';

const BASE = process.env.REACT_APP_API_URL;

export const getTransactions = async () => {
    const res = await apiFetch(`${BASE}/transactions`);
    return res.json();
};

export const getTransaction = async (id) => {
    const res = await apiFetch(`${BASE}/transactions/${id}`);
    return res.json();
};