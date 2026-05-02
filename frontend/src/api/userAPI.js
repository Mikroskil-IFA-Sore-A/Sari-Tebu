export const getUsers = async ({ search = "", status = "" }) => {
    const token = localStorage.getItem("accessToken");

    const query = new URLSearchParams({
        search,
        status,
    }).toString();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/users?${query}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.json();
};

export const createUser = async (data) => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return res.json();
};