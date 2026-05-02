export const getProducts = async ({ search = "", status = "", loss = false }) => {
    const token = localStorage.getItem("accessToken");

    const query = new URLSearchParams({
        search,
        status,
        loss,
    }).toString();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/products?${query}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.json();
};

export const createProduct = async (formData) => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    return res.json();
};