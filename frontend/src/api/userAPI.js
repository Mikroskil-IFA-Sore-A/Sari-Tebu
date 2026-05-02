import { apiFetch } from "./apiFetch";

export const getUsers = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await apiFetch(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.json();
};

export const deleteUser = async (id) => {
    const token = localStorage.getItem("accessToken");
    const res = await apiFetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};
