export const getDashboard = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${process.env.REACT_APP_API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};