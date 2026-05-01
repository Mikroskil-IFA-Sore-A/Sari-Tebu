export async function loginApi({ username, password }) {
    const res = await fetch(`${process.env.API_URL}/authentications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

export async function registerApi({ fullname, username, password }) {
    const res = await fetch(`${process.env.API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, username, password }),
    });
    const text = await res.text();
  console.log('Register status:', res.status);
  console.log('Register response:', text);

  return JSON.parse(text);
}

export async function refreshTokenApi(refreshToken) {
    const res = await fetch(`${process.env.API_URL}/authentications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });
    return res.json();
}

export async function logoutApi(refreshToken) {
    const res = await fetch(`${process.env.API_URL}/authentications`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });
    return res.json();
}