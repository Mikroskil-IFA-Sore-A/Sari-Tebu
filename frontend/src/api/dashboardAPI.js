export const getDashboard = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${process.env.API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};